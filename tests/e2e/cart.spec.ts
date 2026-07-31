import { test, expect } from "@playwright/test";

test("Cart page loads", async ({ page }) => {
  await page.goto("/cart");

  await expect(page.locator("body")).toBeVisible();
});
