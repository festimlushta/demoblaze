import { test } from "@playwright/test";
import { App } from "../pages/App";
import { userData } from "../data/userData";
import { login } from "../pages/components/auth";

test.describe("Cart item tests", () => {
  test("Check that cart items add successfully", async ({ page }) => {
    const app = new App(page);
    // await login(page, userData.username, userData.password);
    await app.AuthPage.login(userData.username, userData.password);
    await app.CartPage.addItemsToCart();
  });
});
