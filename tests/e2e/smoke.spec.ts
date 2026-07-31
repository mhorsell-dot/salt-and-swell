import { test, expect } from "@playwright/test";

test("Homepage loads without runtime errors", async ({ page }) => {
  const runtimeErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on("pageerror", (err) => {
    runtimeErrors.push(err.message);
  });

  page.on("console", (msg) => {
    if (msg.type() !== "error") return;

    const text = msg.text();

    // Ignore expected Next.js development HMR messages
    if (
      text.includes("webpack-hmr") ||
      text.includes("_next/webpack-hmr") ||
      text.includes("WebSocket connection") ||
      text.includes("ERR_INVALID_HTTP_RESPONSE")
    ) {
      return;
    }

    runtimeErrors.push(text);
  });

  page.on("response", (response) => {
    if (response.status() >= 500) {
      failedRequests.push(`${response.status()} ${response.url()}`);
    }
  });

  const response = await page.goto("/", {
    waitUntil: "load",
  });

  expect(response).not.toBeNull();
  expect(response!.status()).toBe(200);

  await expect(page.locator("body")).toBeVisible();

  await expect(page).toHaveTitle(/Salt|Swell/i);

  expect(failedRequests).toEqual([]);
  expect(runtimeErrors).toEqual([]);
});
