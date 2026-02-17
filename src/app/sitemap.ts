import { MetadataRoute } from "next";

/**
 * Sitemap Generator
 *
 * Generates sitemap.xml for SEO
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */

const BASE_URL = "https://kumleshkumar.dev";

// Static pages
const staticPages = [
  "",
  "/work",
  "/writing",
  "/systems",
  "/experiments",
  "/about",
  "/now",
  "/contact",
  "/resume",
  "/changelog",
  "/colophon",
];

// Dynamic pages (case studies, articles, systems)
const projects = ["customer-churn", "house-price", "digit-recognition"];

const articles = [
  "customer-churn-analysis",
  "real-estate-price-prediction",
  "cross-validation-guide",
  "feature-engineering-lessons",
  "handling-imbalanced-data",
];

const systemsTopics = [
  "ml-pipeline-architecture",
  "data-preprocessing-patterns",
  "model-evaluation-framework",
  "feature-engineering-system",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static pages
  const staticRoutes = staticPages.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" ? "weekly" : ("monthly" as const),
    priority: route === "" ? 1 : route === "/work" ? 0.9 : 0.8,
  }));

  // Project pages
  const projectRoutes = projects.map((slug) => ({
    url: `${BASE_URL}/work/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Article pages
  const articleRoutes = articles.map((slug) => ({
    url: `${BASE_URL}/writing/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Systems pages
  const systemsRoutes = systemsTopics.map((topic) => ({
    url: `${BASE_URL}/systems/${topic}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...articleRoutes,
    ...systemsRoutes,
  ];
}
