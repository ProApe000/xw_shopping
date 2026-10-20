import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
import { expect } from "@playwright/test";
const browser = await chromium.launch({
  ...(process.env.CHROME_PATH
    ? { executablePath: process.env.CHROME_PATH }
    : {}),
  headless: true,
});
const baseURL = process.env.BASE_URL || "http://localhost:5173";
const screenshotDir = process.env.SCREENSHOT_DIR || "test-results";
await mkdir(screenshotDir, { recursive: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const capture = async (name, fullPage = true) => {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: `${screenshotDir}/${name}.png`,
    fullPage,
    animations: "disabled",
  });
};
const errors = [];
try {
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(`${baseURL}/`);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator(".product-card").count(), 12);
  await capture("nest-desktop");
  await page.getByRole("button", { name: "Home", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(4);
  await page.getByRole("textbox", { name: "Search products" }).fill("mug");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page
    .getByRole("combobox", { name: "Sort products" })
    .selectOption("price-desc");
  assert.ok(page.url().includes("sort=price-desc"));
  await page.getByRole("link", { name: "View Sunday Stoneware Mug" }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Choose size", exact: true })
      .isDisabled(),
    true,
  );
  await page.getByRole("button", { name: "300 ml", exact: true }).click();
  await page.getByRole("button", { name: "Add to bag", exact: true }).click();
  await page.getByRole("dialog").waitFor();
  assert.equal(
    await page.evaluate(() => document.body.style.overflow),
    "hidden",
  );
  await expect(page.getByRole("button", { name: "Close bag" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Continue to checkout" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Close bag" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Added to your bag", exact: true }),
  ).toBeFocused();
  await page.getByRole("link", { name: "All goods", exact: true }).click();
  assert.equal(
    await page.getByRole("textbox", { name: "Search products" }).inputValue(),
    "mug",
  );
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.reload();
  await page
    .getByRole("button", { name: "Open shopping bag, 1 items" })
    .click();
  await page
    .getByRole("button", { name: "Increase Sunday Stoneware Mug quantity" })
    .click();
  assert.ok(
    await page
      .getByRole("dialog")
      .innerText()
      .then((t) => t.includes("$48.00") && t.includes("$53.99")),
  );
  await page.getByRole("button", { name: "Continue to checkout" }).click();
  await page.getByRole("button", { name: "Place demo order" }).click();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(7);
  for (const [label, value] of Object.entries({
    "First name": "Alex",
    "Last name": "Morgan",
    "Email address": "alex@example.com",
    "Street address": "123 Oak Street",
    City: "Portland",
    State: "Oregon",
    "ZIP code": "97201",
  }))
    await page.getByLabel(label, { exact: true }).fill(value);
  await capture("nest-checkout");
  await page.getByRole("button", { name: "Place demo order" }).click();
  await page
    .getByRole("heading", { name: "Good things are in your bag." })
    .waitFor();
  assert.equal(
    await page.evaluate(() => localStorage.getItem("nest-nomad-cart-v1")),
    "[]",
  );
  await capture("nest-success");
  await page.reload();
  await page
    .getByRole("heading", { name: "Your next favorite is waiting." })
    .waitFor();
  await page.goto(`${baseURL}/products/type-compact-keyboard`);
  assert.equal(
    await page
      .getByRole("button", { name: "Back soon", exact: true })
      .isDisabled(),
    true,
  );
  await page.goto(`${baseURL}/?q=not-a-product`);
  await page.getByRole("heading", { name: "Nothing here just yet." }).waitFor();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${baseURL}/`);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await capture("nest-mobile");
  await page.getByRole("link", { name: "View Sunday Stoneware Mug" }).click();
  await page.getByRole("button", { name: "450 ml", exact: true }).click();
  await page
    .locator(".mobile-purchase")
    .getByRole("button", { name: "Add to bag" })
    .click();
  await page.getByRole("dialog").waitFor();
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await capture("nest-mobile-cart", false);
  await page.getByRole("button", { name: "Close bag" }).click();
  await capture("nest-mobile-product");
  await page
    .getByRole("button", { name: "Open shopping bag, 1 items" })
    .click();
  await page.getByRole("button", { name: "Continue to checkout" }).click();
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await capture("nest-mobile-checkout");
  await page.goto(`${baseURL}/products/---`);
  await page
    .getByRole("heading", { name: "This little find is missing." })
    .waitFor();
  await page.goto(`${baseURL}/not-a-real-page`);
  await page
    .getByRole("heading", { name: "Let's find your way home." })
    .waitFor();
  assert.deepEqual(errors, []);
  console.log(
    "PASS: desktop/mobile browse, filters, URL restoration, variants, stock, bag persistence, quantity, shipping, validation, demo order, empty state, no horizontal overflow, no runtime errors.",
  );
} finally {
  await browser.close();
}
