import { expect, Locator, Page } from "@playwright/test";

export class SignUpPage {
  readonly page: Page;
  readonly signUpModal: Locator; 
  readonly signInModalTitle: Locator;
  readonly usernameText: Locator;
  readonly usernameInput: Locator;
  readonly passwordText: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly closeButtonInSignUpModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpModal = page.locator('#signin2');
    this.signInModalTitle = page.locator('#signInModalLabel');
    this.usernameText = page.getByText('Username:');
    this.usernameInput = page.locator('#sign-username');
    this.passwordText = page.locator('Password:');
    this.passwordInput = page.locator('#sign-password');
    this.signUpButton = page.locator('button:has-text("Sign up")');
    this.closeButtonInSignUpModal = page.locator('button:has-text("Close")');

  }
  
  async clickSignUpModal(){
    await this.signUpModal.click();
  }

  async fillUsernameInput(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPasswordInput(password: string) {
    await this.usernameInput.fill(password);
  }

  async clickSignUpButton(){
    await this.signUpButton.click();
  }

  async clickCloseButtonInSignUpModal(){
    await this.closeButtonInSignUpModal.click();
  }


  async assertSignUpForm() {
    // Go to the website
    await this.page.goto("https://demoblaze.com/");

    // Click on the sign-up button
    await this.page.click("#signin2");
    await expect.soft(this.signInModalTitle, "Check if Sign Up modal title is visible").toBeVisible();
    await expect.soft(this.usernameText, "Check if username text is visible").toBeVisible();
    await expect.soft(this.usernameInput, "Check if username input is visible").toBeVisible();
    await expect.soft(this.passwordText, "Check if password text is visible").toBeVisible();
    await expect.soft(this.passwordInput, "Check if password input is visible").toBeVisible();
    await expect.soft(this.signUpButton, "Check if Sign Up button is visible").toBeVisible();
    await expect.soft(this.closeButtonInSignUpModal, "Check if Close button is visible").toBeVisible();
  }
    // Fill in username and password
    async assertSignUpForm2(username: string, password: string) {

    await this.page.fill("#sign-username", username);
    await this.page.fill("#sign-password", password);

    // Find the 'Sign up' button inside the modal-footer and click it
    const signUpButton = this.page.locator(".modal-footer >> text=Sign up");
    await this.page.waitForTimeout(1000); // Wait for modal to appear
    await signUpButton.click();

    // Listen for alert dialog and validate its text
    const alertText = await new Promise<string>((resolve) => {
      this.page.once("dialog", async (dialog) => {
        resolve(dialog.message()); // Get the alert message
        await dialog.accept(); // Accept the alert
      });
    });


    console.log("alertText", alertText);

    // Validate the alert text
    expect(alertText).toBe("Sign up successful.");
  }

  async checkEqual2() {
    return expect(2).toBe(2);
  }
}
