import { test } from "@playwright/test";
import { App } from "../pages/App";
import { userData } from "../data/userData";

// test.describe("Auth Page Tests", () => {
//   test("Check signup with valid credentials", async ({ page }) => {
//     const app = new App(page);
//     const randomUsername = Math.random().toString(36).substring(7);
//     const randomPassword = Math.random().toString(36).substring(7);
//     await app.AuthPage.signUp(randomUsername, randomPassword);
//   });
//   test("Check login with valid credentials", async ({ page }) => {
//     const app = new App(page);
//     await app.AuthPage.login(userData.username, userData.password);
//   });
// });
