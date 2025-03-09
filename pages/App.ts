import { Page } from "@playwright/test";
import { SignUpPage } from "./SignUpPage";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { CartPage } from "./CartPage";

export class App {
  protected page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  public get SignUpPage() {
    return new SignUpPage(this.page);
  }

  public get LoginPage() {
    return new LoginPage(this.page);
  }

  public get HomePage() {
    return new HomePage(this.page);
  }

  public get CartPage() {
    return new CartPage(this.page);
  }
}
