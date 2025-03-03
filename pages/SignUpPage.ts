import { expect, Locator, Page } from "@playwright/test";

export class SignUpPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async signUp(username: string, password: string) {
    
  }

  async checkEqual2() {
    return expect(2).toBe(1);
  }
}