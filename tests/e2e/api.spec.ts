import { test, expect } from "@playwright/test";

test("API endpoints respond", async ({ request }) => {
  const endpoints = ["/api/products", "/api/search?q=test", "/api/wishlist"];

  for (const ep of endpoints) {
    const res = await request.get(ep);

    expect(res.status()).toBeLessThan(500);
  }
});
