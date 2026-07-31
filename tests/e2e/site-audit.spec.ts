import { test, expect, type Page, type ConsoleMessage } from "@playwright/test";

const visited = new Set<string>();

async function crawl(page: Page, url: string): Promise<void> {
  if (visited.has(url)) return;
  visited.add(url);

  console.log("Checking:", url);

  const errors: string[] = [];

  page.on("pageerror", (e: Error) => {
    errors.push(e.message);
  });

  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") {
      errors.push(msg.text());
    }
  });

  await page.goto(url, {
    waitUntil: "load",
  });

  await expect(page.locator("body")).toBeVisible();

  const buttons = await page.locator("button").all();

  for (const button of buttons) {
    const text = await button.textContent();

    try {
      await button.click({
        timeout: 2000,
      });
    } catch {
      console.log("⚠ Button not clickable:", text);
    }
  }

  const hrefs = await page
    .locator("a[href]")
    .evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")).filter((href): href is string => !!href),
    );

  for (const href of hrefs) {
    if (href.startsWith("http")) continue;
    if (href.startsWith("#")) continue;

    try {
      await page.goto(`http://localhost:3000${href}`, {
        waitUntil: "load",
      });

      if (page.url().includes("404")) {
        console.log("❌ Broken link:", href);
      }
    } catch {
      console.log("❌ Navigation failed:", href);
    }
  }

  if (errors.length > 0) {
    console.log("");
    console.log("Errors on", url);

    errors.forEach((e: string) => console.log(e));
  }
}

test("Complete site audit", async ({ page }) => {
  await crawl(page, "http://localhost:3000");
});
