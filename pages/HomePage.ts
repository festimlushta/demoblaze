import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly getInTouchSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getInTouchSection = page
      .locator(".caption:has-text('Get in Touch')")
      .locator("../..");
  }

  async assertGetInTouchSection() {
    await this.page.waitForTimeout(2000);
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
