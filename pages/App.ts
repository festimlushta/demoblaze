import { Page } from "@playwright/test";
import { SignUpPage } from "./SignUpPage";

export class App {
  protected page: Page;
  constructor(page: Page) {
      this.page = page;
  }

  public get SignUpPage() {
      return new SignUpPage(this.page);
  }
}