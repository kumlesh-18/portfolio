import { test, expect } from "@playwright/test";

/**
 * Navigation E2E Tests
 */

test.describe("Navigation", () => {
  const pages = [
    { path: "/", title: "Kumlesh Kumar" },
    { path: "/work", title: "Work" },
    { path: "/writing", title: "Writing" },
    { path: "/systems", title: "Systems" },
    { path: "/experiments", title: "Experiments" },
    { path: "/about", title: "About" },
    { path: "/now", title: "Now" },
    { path: "/contact", title: "Contact" },
    { path: "/resume", title: "Resume" },
    { path: "/changelog", title: "Changelog" },
    { path: "/colophon", title: "Colophon" },
  ];

  for (const { path, title } of pages) {
    test(`should load ${path} page`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(new RegExp(title, "i"));
    });
  }

  test("should show 404 for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.locator("h1")).toContainText("404");
  });
});
