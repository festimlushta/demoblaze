import { expect, Locator, Page } from "@playwright/test";

export class AuthPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    // Go to the website
    await this.page.goto("https://demoblaze.com/");

    // Click on the login button
    await this.page.click("#login2");

    // Fill in username and password
    await this.page.fill("#loginusername", username);
    await this.page.fill("#loginpassword", password);

    await this.page.waitForTimeout(1000); // Wait for modal to appear
    // Find the 'Log in' button inside logInModal id
    const loginButton = this.page.locator(
      "#logInModal button:has-text('Log in')"
    );
    console.log("loginButton", loginButton);
    const loginButtonInnerText = await loginButton.innerText();
    console.log("loginButtonInnerText", loginButtonInnerText);
    await loginButton.click();

    // wait for the login to complete
    await this.page.waitForSelector("#nameofuser");

    // Validate the username
    const usernameText = await this.page.innerText("#nameofuser");
    expect(usernameText).toContain(username);
  }

  async signUp(username: string, password: string) {
    // Go to the website
    await this.page.goto("https://demoblaze.com/");

    // Click on the sign-up button
    await this.page.click("#signin2");

    // Fill in username and password
    await this.page.fill("#sign-username", username);
    await this.page.fill("#sign-password", password);

    // Find the 'Sign up' button inside the modal-footer and click it
    await this.page.waitForTimeout(1000); // Wait for modal to appear
    const signUpButton = this.page.locator(".modal-footer >> text=Sign up");
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
}
