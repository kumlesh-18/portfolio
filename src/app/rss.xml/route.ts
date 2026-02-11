import { generateRSSFeed, type RSSItem } from "@/lib/rss";

/**
 * RSS Feed Route
 *
 * Generates RSS 2.0 feed for writing/blog posts
 * Access at: /rss.xml
 */

// Article data (mirrored from writing page)
const articles: RSSItem[] = [
  {
    id: "customer-churn-analysis",
    title: "Customer Churn Analysis Using Supervised Learning Algorithms",
    summary:
      "A deep dive into predicting customer churn using Logistic Regression and ensemble methods. Includes business impact analysis of predictive analytics.",
    date: "May 2025",
    category: "Case Study",
    url: "/writing/customer-churn-analysis",
  },
  {
    id: "real-estate-price-prediction",
    title:
      "Predictive Modeling for Real Estate Price Estimation Using Machine Learning",
    summary:
      "Exploring regression-based models for housing price prediction. Comparing Linear Regression, Random Forest, and feature-engineered approaches.",
    date: "March 2025",
    category: "Technical Publication",
    url: "/writing/real-estate-price-prediction",
  },
  {
    id: "cross-validation-guide",
    title: "A Practical Guide to Cross-Validation",
    summary:
      "Why holdout validation isn't enough, and how to implement K-Fold, Stratified, and Time Series cross-validation correctly.",
    date: "February 2025",
    category: "Tutorial",
    url: "/writing/cross-validation-guide",
  },
  {
    id: "feature-engineering-lessons",
    title: "Feature Engineering Lessons from Real Projects",
    summary:
      "Domain knowledge beats automated feature generation. Lessons learned from building production ML pipelines.",
    date: "January 2025",
    category: "Lessons Learned",
    url: "/writing/feature-engineering-lessons",
  },
  {
    id: "handling-imbalanced-data",
    title: "The Truth About Handling Imbalanced Datasets",
    summary:
      "SMOTE isn't always the answer. A balanced look at techniques for dealing with class imbalance in real-world problems.",
    date: "December 2024",
    category: "Deep Dive",
    url: "/writing/handling-imbalanced-data",
  },
];

export async function GET() {
  const feed = generateRSSFeed(articles);

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
