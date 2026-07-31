import { test, expect } from "@playwright/test";

test("Images should have alt text", async ({ page }) => {
  await page.goto("/");

  const images = page.locator("img");

  const count = await images.count();

  for (let i = 0; i < count; i++) {
    const alt = await images.nth(i).getAttribute("alt");

    expect(alt).not.toBeNull();
  }
});
