import { MetadataRoute } from "next";

/**
 * Robots.txt Generator
 *
 * Controls search engine crawling
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://kumleshkumar.dev/sitemap.xml",
  };
}
