import { test, expect } from "@playwright/test";

test("Collections page loads", async ({ page }) => {
  await page.goto("/collections");

  await expect(page).toHaveURL(/collections/);
});
