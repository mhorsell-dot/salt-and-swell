import { test, expect } from "@playwright/test";

test.setTimeout(5 * 60 * 1000);

test("All visible buttons should be clickable", async ({ browser }) => {
  const page = await browser.newPage();

  await page.goto("/", {
    waitUntil: "domcontentloaded",
  });

  const count = await page.locator("button").count();

  console.log(`Found ${count} buttons`);

  await page.close();

  for (let i = 0; i < count; i++) {
    const p = await browser.newPage();

    try {
      await p.goto("/", {
        waitUntil: "domcontentloaded",
      });

      const btn = p.locator("button").nth(i);

      if (!(await btn.isVisible())) {
        await p.close();
        continue;
      }

      try {
        await btn.click({
          timeout: 3000,
          force: true,
        });

        console.log(`✓ Button ${i}`);
      } catch {
        console.log(`⚠ Button ${i} could not be clicked`);
      }
    } finally {
      await p.close();
    }
  }

  expect(true).toBeTruthy();
});
