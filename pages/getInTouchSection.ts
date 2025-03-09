import { expect, Locator, Page } from "@playwright/test";


export class getInTouchSection {
  readonly page: Page;
  readonly getInTouchText: Locator;
  readonly addressText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getInTouchText = page.getByText('Get in Touch');
    this.addressText= page.getByText('Address:')


  }

  //Dynamic Locators


  getAddress(address: string) {
    return this.addressText.locator(`p:text-is("${address}")`);
}


// Actions


  async assertAddress(address: string) {
    await expect.soft(this.getAddress(address)).toBeVisible();
}

}
