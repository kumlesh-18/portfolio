/**
 * Reading Time Calculator
 *
 * Calculates estimated reading time for articles
 * Based on average reading speed of 200-250 words per minute
 */

const WORDS_PER_MINUTE = 200;

/**
 * Calculate reading time from text content
 * @param text - The text content to analyze
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string): number {
  // Remove HTML tags if present
  const cleanText = text.replace(/<[^>]*>/g, "");

  // Count words (split by whitespace)
  const words = cleanText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordCount = words.length;

  // Calculate reading time
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  // Minimum 1 minute
  return Math.max(1, minutes);
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 min read"
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return "1 min read";
  }
  return `${minutes} min read`;
}

/**
 * Calculate and format reading time from text
 * @param text - The text content to analyze
 * @returns Formatted reading time string
 */
export function getReadingTime(text: string): string {
  const minutes = calculateReadingTime(text);
  return formatReadingTime(minutes);
}

/**
 * Get word count from text
 * @param text - The text content to analyze
 * @returns Word count
 */
export function getWordCount(text: string): number {
  const cleanText = text.replace(/<[^>]*>/g, "");
  return cleanText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}
