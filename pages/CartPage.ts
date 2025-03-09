import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartPage: Locator;
  readonly addToCartButton: Locator;
  readonly placeOrderButton: Locator;
  readonly deleteProductButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartPage = page.locator('text= Cart');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.placeOrderButton = page.locator('button:has-text("Place Order")');
    this.deleteProductButton = page.locator('button:has-text("Delete")');
  }

  async addItemsToCart() {
    // Go to the website
    await this.page.goto("https://demoblaze.com/");

    // Click on the first item
    await this.page.click("text=Samsung galaxy s6");

    // Add the item to cart
    await this.page.click("text=Add to cart");

    const alertText = await new Promise<string>((resolve) => {
      this.page.once("dialog", async (dialog) => {
        resolve(dialog.message()); // Get the alert message
        await dialog.accept(); // Accept the alert
      });
    });

    // Validate the alert message
    expect(alertText).toBe("Product added.");
  }
}
