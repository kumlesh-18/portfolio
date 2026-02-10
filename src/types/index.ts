/**
 * Type definitions for the portfolio
 * All types derived from the resume data structure
 */

export interface PersonalInfo {
  name: string;
  title: string;
  positioning: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  experienceYears: number;
}

export interface Metrics {
  projectsCompleted: number;
  modelsBuilt: number;
  publications: number;
  monthsExperience: number;
  coursesCompleted: number;
  datasetsAnalyzed: string;
}

export interface Education {
  id: string;
  degree: string;
  specialization: string;
  institution: string;
  institutionShort: string;
  url?: string;
  period: string;
  location: string;
  status: "ongoing" | "completed";
  score?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyType?: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ProjectMetrics {
  [key: string]: string | number;
}

export interface Project {
  id: string;
  name: string;
  shortName: string;
  type: string;
  category: "machine-learning" | "deep-learning" | "data-analysis";
  period: string;
  status: "completed" | "in-progress" | "planned";
  summary: string;
  highlights: string[];
  techStack: string[];
  metrics: ProjectMetrics;
  featured: boolean;
}

export interface Publication {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
}

export interface Skill {
  name: string;
  level: "primary" | "intermediate" | "beginner";
  category: string;
}

export interface SkillGroup {
  title: string;
  items: Skill[];
}

export interface Course {
  id: string;
  name: string;
  provider: string;
  platform: string;
  period: string;
  topics: string[];
}

export interface Language {
  name: string;
  level: string;
}

export interface NowStatus {
  lastUpdated: string;
  currentlyBuilding: string;
  currentlyLearning: string[];
  availableFor: string[];
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

// Theme types
export type Theme = "light" | "dark" | "system";

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}
