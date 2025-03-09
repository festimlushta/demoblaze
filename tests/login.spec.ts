import { test } from "@playwright/test";
import { App } from "../pages/App";
import { userData } from "../data/userData";

test.describe("Login Page Tests", () => {
  let app: App;
  test.beforeEach(async ({ page }) => {
    app = new App(page);
    await page.goto("https://demoblaze.com/");
  });

  test("Verify login with valid credentials", async ({ page }) => {
    await app.LoginPage.login(userData.username, userData.password);
  });
});
