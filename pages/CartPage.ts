import { Locator, Page, expect } from "@playwright/test";
import { getAlertText } from "../utils/pageHelpers";

export class CartPage {
  readonly page: Page;
  readonly homePage: Locator;
  readonly cartPage: Locator;
  readonly addToCartButton: Locator;
  readonly placeOrderButton: Locator;
  readonly deleteProductButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homePage = page.locator(".nav-link >> text=Home");
    this.cartPage = page.locator(".nav-link >> text=Cart");
    this.addToCartButton = page.locator('a:has-text("Add to cart")');
  }

  async clickHomePage() {
    await this.homePage.click();
    await this.page.waitForTimeout(2000);
  }

  async clickCartPage() {
    await this.cartPage.click();
  }

  async clickCartItem(productName: string) {
    await this.page.click(`text=${productName}`);
  }

  async clickAddToCartButton() {
    await this.addToCartButton.click();
  }

  async clickPlaceOrderButton() {
    await this.placeOrderButton.click();
  }

  async assertItemAddedToCart() {
    const alertText = await getAlertText(this.page);
    expect(alertText).toBe("Product added.");
  }

  async assertItemAddedToCartWithoutLoggingIn() {
    const alertText = await getAlertText(this.page);
    expect(alertText).toBe("Product added");
  }

  async verifyCartProductsOnCartPage(products: string[]) {
    await this.clickCartPage();
    for (const product of products) {
      await expect(
        this.page.locator(`.success >> text=${product}`)
      ).toBeVisible();
    }
  }

  async deleteAllProducts() {
    await this.clickCartPage();
    await this.page.waitForTimeout(2000);
    let deleteProductButtons = this.page.locator('text="Delete"');

    while ((await deleteProductButtons.count()) > 0) {
      await deleteProductButtons.first().click();
      // wait for products to load
      await this.page.waitForTimeout(2000);
    }
  }

  async deleteProduct(productName: string) {
    await this.clickCartPage();
    await this.page.waitForTimeout(2000);
    await this.page.click(
      `text=${productName} >> xpath=//following-sibling::td/a`
    );
    // wait for product to be deleted
    await this.page.waitForTimeout(2000);
  }
}
