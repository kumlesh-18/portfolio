/**
 * RSS Feed Generator
 *
 * Generates RSS 2.0 feed for writing/blog posts
 */

import { resumeData } from "@/data/resume";

export interface RSSItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  url: string;
}

const SITE_URL = "https://kumleshkumar.dev";

export function generateRSSFeed(items: RSSItem[]): string {
  const { personal } = resumeData;

  const rssItems = items
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${SITE_URL}${item.url}</link>
      <guid isPermaLink="true">${SITE_URL}${item.url}</guid>
      <description><![CDATA[${item.summary}]]></description>
      <category>${item.category}</category>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${personal.name} - Writing</title>
    <link>${SITE_URL}/writing</link>
    <description>Technical articles on machine learning, data science, and engineering by ${personal.name}</description>
    <language>en-us</language>
    <managingEditor>${personal.email} (${personal.name})</managingEditor>
    <webMaster>${personal.email} (${personal.name})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/og-image.png</url>
      <title>${personal.name} - Writing</title>
      <link>${SITE_URL}</link>
    </image>
${rssItems}
  </channel>
</rss>`;
}
