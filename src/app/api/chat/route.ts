/**
 * CHAT API ROUTE
 * Handles chat requests and streams responses from Groq
 */

import { NextRequest, NextResponse } from "next/server";
import groq, { DEFAULT_MODEL, RATE_LIMIT } from "@/lib/groq";
import { getSystemPrompt } from "@/lib/knowledge-base";
import type { ChatRequest } from "@/types/chat";

// Rate limiting store (in production, use Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  // Use IP address or a fallback
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "anonymous";
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window

  const record = requestCounts.get(key);

  if (!record || now > record.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= RATE_LIMIT.maxRequestsPerMinute) {
    return false;
  }

  record.count++;
  return true;
}

function sanitizeMessage(message: string): string {
  // Remove potential prompt injection attempts
  return message
    .replace(/\[SYSTEM\]/gi, "")
    .replace(/\[INST\]/gi, "")
    .replace(/<\|.*?\|>/g, "")
    .slice(0, 500); // Max 500 characters
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitKey = getRateLimitKey(request);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again in a minute." },
        { status: 429 },
      );
    }

    // Parse request body
    const body: ChatRequest = await request.json();

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    // Sanitize user message
    const sanitizedMessage = sanitizeMessage(body.message);

    // Limit conversation history to last 10 messages
    const history = (body.history || []).slice(-10);

    // Get system prompt with knowledge base
    const systemPrompt = getSystemPrompt();

    // Build messages array
    const messages: Array<{
      role: "system" | "user" | "assistant";
      content: string;
    }> = [
      { role: "system", content: systemPrompt },
      ...history.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user", content: sanitizedMessage },
    ];

    // Create streaming response
    const stream = await groq.chat.completions.create({
      model: DEFAULT_MODEL,
      messages,
      max_tokens: RATE_LIMIT.maxTokensPerRequest,
      temperature: 0.7,
      stream: true,
    });

    // Create a ReadableStream for the response
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              const data = JSON.stringify({ content });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Check for specific Groq errors
    if (error instanceof Error) {
      if (error.message.includes("rate_limit")) {
        return NextResponse.json(
          { error: "API rate limit exceeded. Please try again later." },
          { status: 429 },
        );
      }
      if (error.message.includes("invalid_api_key")) {
        return NextResponse.json(
          { error: "Service configuration error. Please contact support." },
          { status: 500 },
        );
      }
    }

    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 },
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
