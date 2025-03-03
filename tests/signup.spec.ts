import { test } from "@playwright/test";
import { App } from "../pages/App";
import { userData } from "../data/userData";

test.describe("Login Page Tests", () => {
  test("Check if 2 equals 2", async ({ page }) => {
    const app = new App(page);
    await app.SignUpPage.checkEqual2();
  });

  test("Check signup with valid credentials", async ({ page }) => {
    const app = new App(page);
    await app.SignUpPage.signUp(userData.username, userData.password);
  });
});
