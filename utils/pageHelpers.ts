import { Page } from "playwright";

const getAlertText = async (page: Page) => {
  const alertText = await new Promise<string>((resolve) => {
    page.once("dialog", async (dialog) => {
      resolve(dialog.message()); // Get the alert message
      await dialog.accept(); // Accept the alert
    });
  });

  return alertText;
};

export { getAlertText };
