import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginModal: Locator;
  readonly loginModalTitle: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly closeButtonInLoginModal: Locator;
  readonly loggedInUser: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginModal = page.locator("#login2");
    this.loginModalTitle = page.locator("#signInModalLabel");
    this.usernameInput = page.locator("#loginusername");
    this.passwordInput = page.locator("#loginpassword");
    this.loginButton = page.locator(
      '#logInModal .modal-footer >> button:has-text("Log in")'
    );
    this.closeButtonInLoginModal = page.locator(
      '#logInModal .modal-footer >> button:has-text("Close")'
    );
    this.loggedInUser = page.locator("#nameofuser");
  }

  async clickLoginModal() {
    await this.loginModal.click();
  }

  async fillUsernameInput(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPasswordInput(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async assertLoginForm() {
    await this.clickLoginModal();
    await expect
      .soft(this.loginModalTitle, "Check if Login modal title is visible")
      .toBeVisible();
    await expect
      .soft(this.usernameInput, "Check if username input is visible")
      .toBeVisible();
    await expect
      .soft(this.passwordInput, "Check if password input is visible")
      .toBeVisible();
    await expect
      .soft(this.loginButton, "Check if Login button is visible")
      .toBeVisible();
    await expect
      .soft(this.closeButtonInLoginModal, "Check if Close button is visible")
      .toBeVisible();
  }

  async assertLoggedInUser(username: string) {
    await expect(this.loggedInUser).toBeVisible();

    // Validate the username is inside this.loggedInUser
    const usernameText = await this.loggedInUser.innerText();
    expect(usernameText).toContain(username);
  }

  async login(username: string, password: string) {
    // Click on the login button
    await this.clickLoginModal();

    // Fill in username and password
    await this.fillUsernameInput(username);
    await this.fillPasswordInput(password);

    await this.clickLoginButton();
    await this.assertLoggedInUser(username);
  }

  async logout() {
    await this.page.click("#logout2");
    // wait for the user to logout
    await this.page.waitForTimeout(2000);
    await expect(this.loggedInUser).not.toBeVisible();
  }
}
