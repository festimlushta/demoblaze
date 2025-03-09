import { test } from "@playwright/test";
import { App } from "../pages/App";
import { userData } from "../data/userData";

test.describe("Cart item tests", () => {
  let app: App;
  test.beforeEach(async ({ page }) => {
    app = new App(page);
    await page.goto("https://demoblaze.com/");
  });

  test("Add a single product to cart", async ({ page }) => {
    await app.LoginPage.login(userData.username, userData.password);
    await app.CartPage.deleteAllProducts();
    await app.CartPage.clickHomePage();
    await app.CartPage.clickCartItem("Samsung galaxy s6");
    await app.CartPage.clickAddToCartButton();
    await app.CartPage.assertItemAddedToCart();
    await app.CartPage.verifyCartProductsOnCartPage(["Samsung galaxy s6"]);
  });

  test("Add multiple different products to the cart", async ({ page }) => {
    await app.LoginPage.login(userData.username, userData.password);
    await app.CartPage.deleteAllProducts();
    await app.CartPage.clickHomePage();
    await app.CartPage.clickCartItem("Samsung galaxy s6");
    await app.CartPage.clickAddToCartButton();
    await app.CartPage.assertItemAddedToCart();
    await app.CartPage.clickHomePage();
    await app.CartPage.clickCartItem("Nokia lumia 1520");
    await app.CartPage.clickAddToCartButton();
    await app.CartPage.assertItemAddedToCart();
    await app.CartPage.verifyCartProductsOnCartPage([
      "Samsung galaxy s6",
      "Nokia lumia 1520",
    ]);
  });

  test("Add a single product to cart without logging in", async ({ page }) => {
    await app.CartPage.deleteAllProducts();
    await app.CartPage.clickHomePage();
    await app.CartPage.clickCartItem("Samsung galaxy s6");
    await app.CartPage.clickAddToCartButton();
    await app.CartPage.assertItemAddedToCartWithoutLoggingIn();
    await app.CartPage.verifyCartProductsOnCartPage(["Samsung galaxy s6"]);
  });

  test("Add a single product to cart and delete it after", async ({ page }) => {
    await app.LoginPage.login(userData.username, userData.password);
    await app.CartPage.deleteAllProducts();
    await app.CartPage.clickHomePage();
    await app.CartPage.clickCartItem("Iphone 6 32gb");
    await app.CartPage.clickAddToCartButton();
    await app.CartPage.assertItemAddedToCart();
    await app.CartPage.verifyCartProductsOnCartPage(["Iphone 6 32gb"]);
    await app.CartPage.deleteProduct("Iphone 6 32gb");
  });
});
