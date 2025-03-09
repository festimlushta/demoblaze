import { expect, Page } from "@playwright/test";

async function login(page: Page, username: string, password: string) {
  // Go to the website
  await page.goto("https://demoblaze.com/");

  // Click on the login button
  await page.click("#login2");

  // Fill in username and password
  await page.fill("#loginusername", username);
  await page.fill("#loginpassword", password);

  await page.waitForTimeout(1000); // Wait for modal to appear
  // Find the 'Log in' button inside logInModal id
  const loginButton = page.locator("#logInModal button:has-text('Log in')");
  console.log("loginButton", loginButton);
  const loginButtonInnerText = await loginButton.innerText();
  console.log("loginButtonInnerText", loginButtonInnerText);
  await loginButton.click();

  // wait for the login to complete
  await page.waitForSelector("#nameofuser");

  // Validate the username
  const usernameText = await page.innerText("#nameofuser");
  expect(usernameText).toContain(username);
}

async function checkUserLoggedIn(page: Page, username: string) {
  // Validate the username
  const usernameText = await page.innerText("#nameofuser");
  return usernameText.includes(username);
}

export { login, checkUserLoggedIn };
