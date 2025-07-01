import { test, expect } from '@playwright/test';

// This test covers the child-to-parent communication in the /communication route
// It enters text in the child input, clicks Send Message, and verifies the parent receives it

test('Child to Parent: send message from child and verify parent receives it', async ({ page }) => {
  // Go to the communication page
  await page.goto('http://localhost:4209/communication');

  // Find the child input and type a message
  const childInput = page.getByRole('textbox', { name: 'Enter Your Message...' }).nth(1); // 2nd textbox is child
  const testMessage = 'Hello from Playwright!';
  await childInput.fill(testMessage);

  // Click the Send Message button in the child section
  const sendButton = page.getByRole('button', { name: 'Send Message' }).nth(1); // 2nd button is child
  await sendButton.click();

  // Assert the parent now displays the message
  const parentMessage = page.getByRole('heading', { name: 'Parent' }).locator('..').locator('text=' + testMessage);
  await expect(parentMessage).toBeVisible();
});
