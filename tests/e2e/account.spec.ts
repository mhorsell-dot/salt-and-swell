import { test, expect } from "@playwright/test";

test("Account pages load", async ({ page }) => {
  const pages = [
    "/account",
    "/account/login",
    "/account/register",
    "/account/orders",
    "/account/profile",
    "/account/wishlist",
  ];

  for (const p of pages) {
    await page.goto(p);

    await expect(page.locator("body")).toBeVisible();
  }
});
