import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly getInTouchSection: Locator;

  constructor(page: Page) {
    this.page = page;
    // get the wrapper div of the Get in Touch section
    this.getInTouchSection = page
      .locator(".caption:has-text('Get in Touch')")
      .locator("../..");
  }

  async assertGetInTouchSection() {
    // wait for the page to load
    await this.page.waitForTimeout(2000);
    // scroll at the bottom of the page
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await this.getInTouchSection.scrollIntoViewIfNeeded();
    await expect(this.getInTouchSection).toContainText("Get in Touch");
    await expect(this.getInTouchSection).toContainText(
      "Address: 2390 El Camino Real"
    );
    await expect(this.getInTouchSection).toContainText("Phone: +440 123456");
    await expect(this.getInTouchSection).toContainText(
      "Email: demo@blazemeter.com"
    );
  }
}
