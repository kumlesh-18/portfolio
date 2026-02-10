/**
 * RESUME CONFIGURATION
 * Central configuration for resume asset management
 */

export const resumeConfig = {
  // File information
  file: {
    name: "Kumlesh-Kumar-CV.pdf",
    path: "/Kumlesh-Kumar-CV.pdf",
    downloadName: "Kumlesh-Kumar-Resume.pdf",
    mimeType: "application/pdf",
    size: 424348, // bytes
    lastUpdated: "2026-02-10",
  },

  // Version tracking
  version: "1.0.0",

  // SEO metadata
  meta: {
    title: "Resume - Kumlesh Kumar | Junior ML Engineer",
    description:
      "View and download the professional resume of Kumlesh Kumar, Junior Machine Learning Engineer specializing in Python, Scikit-learn, and deep learning.",
    keywords: [
      "resume",
      "CV",
      "machine learning",
      "data science",
      "Kumlesh Kumar",
    ],
  },

  // Display settings
  display: {
    defaultZoom: 100,
    minZoom: 50,
    maxZoom: 200,
    backgroundColor: "#525659", // PDF viewer background
  },
} as const;

export type ResumeConfig = typeof resumeConfig;
