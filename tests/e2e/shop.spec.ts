import { test, expect } from "@playwright/test";

test("Shop page loads", async ({ page }) => {
  await page.goto("/shop");

  await expect(page).toHaveURL(/shop/);

  await expect(page.locator("body")).toBeVisible();
});
