import { test as setup, expect} from '@playwright/test'
import { STORAGE_STATE} from '../playwright.config'
setup('authendicate', async ( { page })   => {
await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('vengadeswari.rangasamy@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Happy@2026');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://automationexercise.com/')
  await expect(page.getByText('Logged in as')).toBeVisible()

  await page.context().storageState( { path: STORAGE_STATE })
})