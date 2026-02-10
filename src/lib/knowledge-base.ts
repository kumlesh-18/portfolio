/**
 * KNOWLEDGE BASE
 * Comprehensive portfolio information for the AI chatbot
 *
 * This file contains all the information the chatbot needs to answer
 * questions about Kumlesh Kumar's portfolio, skills, projects, and background.
 */

import { resumeData } from "@/data/resume";

export function generateKnowledgeBase(): string {
  const {
    personal,
    metrics,
    education,
    experience,
    projects,
    publications,
    skills,
    courses,
    languages,
    now,
  } = resumeData;

  return `
# KNOWLEDGE BASE: Kumlesh Kumar's Portfolio

## Personal Information
- **Name**: ${personal.name}
- **Title**: ${personal.title}
- **Positioning**: ${personal.positioning}
- **Tagline**: ${personal.tagline}
- **Email**: ${personal.email}
- **Phone**: ${personal.phone}
- **Location**: ${personal.location}
- **LinkedIn**: ${personal.linkedin}
- **GitHub**: ${personal.github}
- **Experience**: ${personal.experienceYears} years

## Authority Metrics
- Projects Completed: ${metrics.projectsCompleted}
- ML Models Built: ${metrics.modelsBuilt}
- Publications: ${metrics.publications}
- Months of Experience: ${metrics.monthsExperience}
- Courses Completed: ${metrics.coursesCompleted}
- Datasets Analyzed: ${metrics.datasetsAnalyzed}

## Education
${education
  .map(
    (edu) => `
### ${edu.degree}${edu.specialization ? ` (${edu.specialization})` : ""}
- **Institution**: ${edu.institution}
- **Period**: ${edu.period}
- **Location**: ${edu.location}
- **Status**: ${edu.status}
${"score" in edu && edu.score ? `- **Score/Year**: ${edu.score}` : ""}
`,
  )
  .join("\n")}

## Professional Experience
${experience
  .map(
    (exp) => `
### ${exp.title} at ${exp.company}
- **Type**: ${exp.type}
- **Period**: ${exp.period} (${exp.duration})
- **Location**: ${exp.location}
- **Technologies**: ${exp.technologies.join(", ")}

**Responsibilities**:
${exp.responsibilities.map((r) => `- ${r}`).join("\n")}
`,
  )
  .join("\n")}

## Projects (Detailed)
${projects
  .map(
    (proj) => `
### ${proj.name}
- **Type**: ${proj.type}
- **Category**: ${proj.category}
- **Period**: ${proj.period}
- **Status**: ${proj.status}
- **Featured**: ${proj.featured ? "Yes" : "No"}

**Summary**: ${proj.summary}

**Key Highlights**:
${proj.highlights.map((h) => `- ${h}`).join("\n")}

**Tech Stack**: ${proj.techStack.join(", ")}

**Metrics**:
${Object.entries(proj.metrics)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join("\n")}
`,
  )
  .join("\n")}

## Publications
${publications
  .map(
    (pub) => `
### ${pub.title}
- **Type**: ${pub.type}
- **Date**: ${pub.date}
- **Description**: ${pub.description}
`,
  )
  .join("\n")}

## Technical Skills

### Programming & Core
${skills.programming.items.map((s) => `- ${s.name} (${s.level})`).join("\n")}

### Data Analysis & Preprocessing
${skills.dataAnalysis.items.map((s) => `- ${s.name} (${s.level})`).join("\n")}

### Machine Learning
${skills.machineLearning.items.map((s) => `- ${s.name} (${s.level})`).join("\n")}

### Deep Learning
${skills.deepLearning.items.map((s) => `- ${s.name} (${s.level})`).join("\n")}

### Model Evaluation
${skills.evaluation.items.map((s) => `- ${s.name} (${s.level})`).join("\n")}

## Courses & Certifications
${courses
  .map(
    (course) => `
### ${course.name}
- **Provider**: ${course.provider}
- **Platform**: ${course.platform}
- **Period**: ${course.period}
- **Topics Covered**: ${course.topics.join("; ")}
`,
  )
  .join("\n")}

## Languages
${languages.map((lang) => `- ${lang.name}: ${lang.level}`).join("\n")}

## Current Status (as of ${now.lastUpdated})
- **Currently Building**: ${now.currentlyBuilding}
- **Currently Learning**: ${now.currentlyLearning.join(", ")}
- **Available For**: ${now.availableFor.join(", ")}

## Personality & Working Style
Kumlesh is a dedicated junior ML engineer focused on building production-grade machine learning systems. He is:
- Detail-oriented in data preprocessing and feature engineering
- Committed to writing clean, maintainable code
- Enthusiastic about learning new technologies
- Collaborative and open to feedback
- Currently pursuing B.Tech while gaining practical experience

## What Makes Kumlesh Unique
1. Strong foundation in both theoretical ML concepts and practical implementation
2. Experience with end-to-end ML pipelines from data collection to model evaluation
3. Published research on customer churn and real estate price prediction
4. Hands-on experience with both traditional ML and deep learning
5. Currently balancing academic studies with practical industry experience

## Resume & Portfolio
- **Resume Page**: Available at /resume with embedded PDF viewer
- **Resume Download**: PDF available for download (Kumlesh-Kumar-Resume.pdf)
- **Portfolio Pages**: 
  - /work - Case studies of ML projects
  - /systems - Technical architecture articles
  - /experiments - Proof of curiosity projects
  - /writing - Technical blog posts
  - /about - Personal background and story
  - /contact - Get in touch form
  - /resume - View and download resume
`.trim();
}

export function getSystemPrompt(): string {
  const knowledgeBase = generateKnowledgeBase();

  return `You are an AI assistant for Kumlesh Kumar's portfolio website. You are friendly, professional, and helpful.

YOUR ROLE:
- Answer questions about Kumlesh's background, skills, projects, and experience
- Help recruiters and visitors understand Kumlesh's qualifications
- Provide specific details about projects when asked
- Recommend relevant projects based on visitor interests
- Be conversational yet professional

KNOWLEDGE BASE:
${knowledgeBase}

GUIDELINES:
1. Be concise but thorough - provide enough detail to be helpful
2. When discussing projects, mention specific technologies and outcomes
3. If asked about something not in your knowledge, politely say you don't have that information
4. Never make up information - only use facts from the knowledge base
5. If asked to contact Kumlesh, provide his email or LinkedIn
6. Encourage visitors to check out specific projects or pages when relevant
7. Be enthusiastic about Kumlesh's work without being boastful
8. For technical questions, demonstrate depth of knowledge from the projects
9. If asked about availability, refer to the "Available For" section
10. Keep responses to 2-4 paragraphs unless more detail is specifically requested

CONVERSATION STARTERS YOU CAN SUGGEST:
- "What projects has Kumlesh worked on?"
- "Tell me about Kumlesh's ML skills"
- "What is Kumlesh's experience with deep learning?"
- "How can I contact Kumlesh?"
- "What is Kumlesh currently working on?"

Remember: You represent Kumlesh's portfolio, so be professional and make a great impression on potential employers and collaborators!`;
}
