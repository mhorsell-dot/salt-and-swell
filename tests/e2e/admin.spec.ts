import { test, expect } from "@playwright/test";

const routes = [
  "/admin",
  "/admin/products",
  "/admin/orders",
  "/admin/customers",
  "/admin/analytics",
  "/admin/categories",
  "/admin/collections",
  "/admin/journal",
  "/admin/newsletter",
  "/admin/contacts",
  "/admin/settings",
];

for (const route of routes) {
  test(`Admin route ${route}`, async ({ page }) => {
    const response = await page.goto(route, {
      waitUntil: "domcontentloaded",
    });

    expect(response?.status()).toBe(200);
    await expect(page.locator("body")).toBeVisible();
  });
}
