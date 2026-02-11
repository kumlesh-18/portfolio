import { test, expect } from "@playwright/test";

/**
 * Accessibility E2E Tests
 */

test.describe("Accessibility", () => {
  test("should have skip-to-content link", async ({ page }) => {
    await page.goto("/");

    // Tab to focus skip link
    await page.keyboard.press("Tab");

    // Check skip link becomes visible on focus
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Check for h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // Check main content landmark
    const main = page.locator("main#main-content");
    await expect(main).toBeVisible();
  });

  test("should be keyboard navigable", async ({ page }) => {
    await page.goto("/");

    // Tab through interactive elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
    }

    // Check that focus is visible
    const focusedElement = await page.evaluate(() =>
      document.activeElement?.tagName.toLowerCase(),
    );

    expect(["a", "button", "input"]).toContain(focusedElement);
  });

  test("should respect prefers-reduced-motion", async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: "reduce" });

    await page.goto("/");

    // Page should still load correctly
    await expect(page.locator("h1")).toBeVisible();
  });
});
