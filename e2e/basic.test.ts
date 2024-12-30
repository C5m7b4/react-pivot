import { test, expect } from "@playwright/test";

test.describe("basics", () => {
  test("has title", async ({ page }) => {
    await page.goto("http://localhost:5174");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("React Pivot Test");
    const label = page.getByTestId("header-text");
    expect(label).toHaveText("Basic Table Example");

    const btn = await page.getByRole("button", { name: "Pivot" });
    await btn.click();
    expect(label).toHaveText("Pivot Table Example");
  });
});
