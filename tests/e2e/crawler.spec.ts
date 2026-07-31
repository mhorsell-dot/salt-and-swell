import { test, expect } from "@playwright/test";

test.setTimeout(10 * 60 * 1000);

test("Autonomous Site Crawl", async ({ browser }) => {
  const queue = ["/"];
  const visited = new Set<string>();

  while (queue.length) {
    const url = queue.shift()!;

    if (visited.has(url)) continue;
    visited.add(url);

    const page = await browser.newPage();

    try {
      console.log(`🌍 ${url}`);

      const errors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          const text = msg.text();

          if (
            text.includes("ERR_CONNECTION_REFUSED") ||
            text.includes("ERR_INCOMPLETE_CHUNKED_ENCODING")
          ) {
            return;
          }

          errors.push(text);
        }
      });

      const res = await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      await page.waitForLoadState("domcontentloaded");

      try {
        await page.waitForLoadState("networkidle", { timeout: 5000 });
      } catch {
        console.log(`⚠️ networkidle timeout on ${url}`);
      }

      expect(page.url()).not.toContain("_not-found");

      if (res) {
        expect(res.status()).toBeLessThan(400);
      }

      expect(errors).toEqual([]);

      const links = await page
        .locator("a[href]")
        .evaluateAll((nodes) =>
          nodes.map((n) => (n as HTMLAnchorElement).getAttribute("href")).filter(Boolean),
        );

      for (const href of links as string[]) {
        if (!href.startsWith("/")) continue;
        if (!visited.has(href)) {
          queue.push(href);
        }
      }
    } finally {
      await page.close();
    }
  }

  console.log(`Visited ${visited.size} pages`);
});
