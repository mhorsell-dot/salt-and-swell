import { test, expect } from "@playwright/test";

test.setTimeout(5 * 60 * 1000);

test("Internal navigation", async ({ browser }) => {
  const home = await browser.newPage();

  await home.goto("/", {
    waitUntil: "domcontentloaded",
  });

  const hrefs = await home
    .locator("a[href]")
    .evaluateAll((nodes) =>
      nodes.map((n) => (n as HTMLAnchorElement).getAttribute("href")).filter(Boolean),
    );

  await home.close();

  const visited = new Set<string>();

  for (const href of hrefs as string[]) {
    if (!href.startsWith("/")) continue;
    if (visited.has(href)) continue;

    visited.add(href);

    const page = await browser.newPage();

    try {
      console.log(`Checking ${href}`);

      const res = await page.goto(href, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      await page.waitForLoadState("networkidle");

      expect(page.url()).not.toContain("_not-found");

      // Ensure the page actually rendered
      await expect(page.locator("body")).toBeVisible();

      // Ensure there is visible content
      const bodyText = (await page.locator("body").innerText()).trim();
      expect(bodyText.length).toBeGreaterThan(0);

      if (res) {
        console.log(`${href} -> ${res.status()}`);
      }
    } finally {
      await page.close();
    }
  }
});
