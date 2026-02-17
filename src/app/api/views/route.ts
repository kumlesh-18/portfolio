import { NextRequest, NextResponse } from "next/server";

/**
 * View Counter API
 *
 * Tracks page/article views
 * Uses in-memory storage for demo (use Vercel KV or database in production)
 *
 * GET /api/views?slug=article-slug - Get view count
 * POST /api/views?slug=article-slug - Increment view count
 */

// In-memory store (replace with Vercel KV or database in production)
// Note: This resets on server restart - for demo purposes only
const viewCounts = new Map<string, number>();

// Initialize with some sample data
const initialCounts: Record<string, number> = {
  "customer-churn-analysis": 124,
  "real-estate-price-prediction": 98,
  "cross-validation-guide": 156,
  "feature-engineering-lessons": 87,
  "handling-imbalanced-data": 112,
  "customer-churn": 203,
  "house-price": 178,
  "digit-recognition": 145,
};

// Initialize counts
Object.entries(initialCounts).forEach(([slug, count]) => {
  viewCounts.set(slug, count);
});

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    // Return all view counts
    const allViews = Object.fromEntries(viewCounts);
    return NextResponse.json({ views: allViews });
  }

  const views = viewCounts.get(slug) || 0;
  return NextResponse.json({ slug, views });
}

export async function POST(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Slug parameter is required" },
      { status: 400 },
    );
  }

  // Increment view count
  const currentViews = viewCounts.get(slug) || 0;
  const newViews = currentViews + 1;
  viewCounts.set(slug, newViews);

  return NextResponse.json({ slug, views: newViews });
}

/**
 * Production Implementation Notes:
 *
 * For production, use Vercel KV:
 *
 * import { kv } from '@vercel/kv'
 *
 * export async function POST(request: NextRequest) {
 *   const slug = request.nextUrl.searchParams.get('slug')
 *   const views = await kv.incr(`views:${slug}`)
 *   return NextResponse.json({ views })
 * }
 *
 * Or use Upstash Redis, PlanetScale, or similar.
 */
