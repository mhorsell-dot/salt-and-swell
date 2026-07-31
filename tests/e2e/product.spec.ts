import { test, expect } from "@playwright/test";

test("Product cards open", async ({ page }) => {
  await page.goto("/shop");

  const cards = page.locator('a[href*="/product"],a[href*="/shop/"]');

  const count = await cards.count();

  expect(count).toBeGreaterThan(0);
});
