import { expect, Locator, Page } from "@playwright/test";

export class SignUpPage {
  readonly page: Page;
  readonly signUpModal: Locator;
  readonly signInModalTitle: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly closeButtonInSignUpModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpModal = page.locator("#signin2");
    this.signInModalTitle = page.locator("#signInModalLabel");
    this.usernameInput = page.locator("#sign-username");
    this.passwordInput = page.locator("#sign-password");
    this.signUpButton = page.locator(
      '#signInModal .modal-footer >> button:has-text("Sign up")'
    );
    this.closeButtonInSignUpModal = page.locator(
      '#signInModal .modal-footer >> button:has-text("Close")'
    );
  }

  async clickSignUpModal() {
    await this.signUpModal.click();
  }

  async fillUsernameInput(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPasswordInput(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickSignUpButton() {
    await this.signUpButton.click();
  }

  async clickCloseButtonInSignUpModal() {
    await this.closeButtonInSignUpModal.click();
  }

  async assertSignUpForm() {
    await this.clickSignUpModal();
    await expect
      .soft(this.signInModalTitle, "Check if Sign Up modal title is visible")
      .toBeVisible();
    await expect
      .soft(this.usernameInput, "Check if username input is visible")
      .toBeVisible();
    await expect
      .soft(this.passwordInput, "Check if password input is visible")
      .toBeVisible();
    await expect
      .soft(this.signUpButton, "Check if Sign Up button is visible")
      .toBeVisible();
    await expect
      .soft(this.closeButtonInSignUpModal, "Check if Close button is visible")
      .toBeVisible();
  }

  async assertSignUpMessage() {
    const alertText = await new Promise<string>((resolve) => {
      this.page.once("dialog", async (dialog) => {
        resolve(dialog.message());
        await dialog.accept();
      });
    });

    expect(alertText).toBe("Sign up successful.");
  }
}
