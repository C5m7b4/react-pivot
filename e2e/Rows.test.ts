import { test, expect } from "@playwright/test";

test.describe("Row", () => {
  test("should handle drop", async ({ page }) => {
    await page.goto("http://localhost:5174");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle("React Pivot Test");

    const btn = await page.getByRole("button", { name: "Pivot" });
    await btn.click();

    const field = await page.getByTestId("field-5");
    expect(field).toHaveText("company");

    const rows = await page.getByTestId("rows");

    // await field.dragTo(rows);
    await field.hover();
    await page.mouse.down();
    await rows.hover();
    await page.mouse.up();
    expect(rows).toContainText("company");
  });
});
