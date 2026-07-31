import { test, expect } from "@playwright/test";

test("Checkout page loads", async ({ page }) => {
  await page.goto("/checkout");

  await expect(page.locator("body")).toBeVisible();
});
