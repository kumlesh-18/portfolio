import { test, expect } from "@playwright/test";

/**
 * Home Page E2E Tests
 */

test.describe("Home Page", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");

    // Check for the main heading
    await expect(page.locator("h1")).toContainText("Kumlesh Kumar");
  });

  test("should have working navigation", async ({ page }) => {
    await page.goto("/");

    // Click on Work link
    await page.click('a[href="/work"]');
    await expect(page).toHaveURL("/work");

    // Click on Writing link
    await page.click('a[href="/writing"]');
    await expect(page).toHaveURL("/writing");
  });

  test("should toggle theme", async ({ page }) => {
    await page.goto("/");

    // Find and click theme toggle button
    const themeToggle = page
      .locator('button[aria-label*="theme"], button[aria-label*="Toggle"]')
      .first();

    // Get initial theme
    const initialTheme = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );

    // Toggle theme
    await themeToggle.click();

    // Check theme changed
    const newTheme = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );

    expect(newTheme).not.toBe(initialTheme);
  });

  test("should open search with keyboard shortcut", async ({ page }) => {
    await page.goto("/");

    // Press Ctrl+K (or Cmd+K on Mac)
    await page.keyboard.press("Control+k");

    // Check search dialog is visible
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });
});
