/**
 * RESUME DOWNLOAD API ROUTE
 * Handles resume downloads with proper headers, caching, and analytics
 */

import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";
import { resumeConfig } from "@/lib/resume-config";

// Analytics store (in production, use a database)
const downloadStats = {
  total: 0,
  lastDownload: null as Date | null,
};

export async function GET(request: NextRequest) {
  try {
    // Get the resume file path
    const resumePath = join(process.cwd(), "public", resumeConfig.file.name);

    // Read the file
    const fileBuffer = await readFile(resumePath);

    // Update analytics
    downloadStats.total++;
    downloadStats.lastDownload = new Date();

    // Log download (in production, send to analytics service)
    console.log(
      `Resume downloaded: ${new Date().toISOString()} | Total: ${downloadStats.total}`,
    );

    // Create response with proper headers
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        // Content type
        "Content-Type": resumeConfig.file.mimeType,

        // Force download with filename
        "Content-Disposition": `attachment; filename="${resumeConfig.file.downloadName}"`,

        // File size
        "Content-Length": fileBuffer.length.toString(),

        // Caching (cache for 1 hour, revalidate after)
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",

        // Security headers
        "X-Content-Type-Options": "nosniff",

        // CORS (allow from same origin)
        "Access-Control-Allow-Origin": "*",
      },
    });

    return response;
  } catch (error) {
    console.error("Resume download error:", error);

    return NextResponse.json(
      { error: "Resume file not found" },
      { status: 404 },
    );
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// Endpoint to get download stats (optional)
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  if (body.action === "stats") {
    return NextResponse.json({
      totalDownloads: downloadStats.total,
      lastDownload: downloadStats.lastDownload?.toISOString() || null,
    });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
