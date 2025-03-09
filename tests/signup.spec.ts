import { test } from "@playwright/test";
import { App } from "../pages/App";

test.describe("SignUp Page Tests", () => {
  let app: App;
  test.beforeEach(async ({ page }) => {
    app = new App(page);
    await page.goto("https://demoblaze.com/");
  });

  test("Verify signup with random credentials", async ({ page }) => {
    const randomUsername = Math.random().toString(36).substring(7);
    const randomPassword = Math.random().toString(36).substring(7);
    await app.SignUpPage.assertSignUpForm();
    await app.SignUpPage.fillUsernameInput(randomUsername);
    await app.SignUpPage.fillPasswordInput(randomPassword);
    await app.SignUpPage.clickSignUpButton();
    await app.SignUpPage.assertSignUpMessage();
  });
});
