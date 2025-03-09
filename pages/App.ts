import { Page } from "@playwright/test";
import { SignUpPage } from "./SignUpPage";
import { AuthPage } from "./AuthPage";
import { CartPage } from "./CartPage";

export class App {
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  public get SignUpPage() {
    return new SignUpPage(this.page);
  }

  public get AuthPage() {
    return new AuthPage(this.page);
  }

  public get CartPage() {
    return new CartPage(this.page);
  }

  public get getInTouchSection(){
    return new this.getInTouchSection(this.page);
  }
}
