import { test } from "@playwright/test";
import { App } from "../pages/App";

test.describe("Login Page Tests", () => {
  let app: App;
  test.beforeEach(async ({ page }) => {
    app = new App(page);
    await page.goto("https://demoblaze.com/");
  });

  test("Verify get in touch section displays correctly", async ({ page }) => {
    await app.HomePage.assertGetInTouchSection();
  });
});
