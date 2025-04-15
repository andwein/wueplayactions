import { test, expect } from '@playwright/test';
import { text } from 'stream/consumers';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.wuestenrot.at/de/home.html');
  await page.getByText('Cookies Um das').click();
  await page.getByRole('button', { name: 'Auswahl speichern' }).click();
});

test('checkAgentData', async ({ page }) => {
  await page.getByRole('link', { name: 'Standort finden' }).click();
  await page.getByRole('textbox', { name: 'Nach Berater:in suchen' }).fill('Rudolf Steiner');
  await page.getByRole('button', { name: 'Suchen' }).click();
  await page.getByRole('link', { name: 'Mehr Details zu Rudolf Steiner' }).click();
  // verify address data
  await expect(page.getByText('Hauptstraße 16')).toBeVisible();
  await expect(page.getByText('7540 Güssing')).toBeVisible();

  // verify contact data
  await expect(page.getByText('Mobil: 0664/4507080')).toBeVisible();
  await expect(page.getByText('Telefon: 057070/318 13')).toBeVisible();
  await expect(page.getByText('E-Mail: rudolf.steiner@wuestenrot')).toBeVisible();
});

test('searchForLocation', async ({ page }) => {
  await page.getByRole('link', { name: 'Standort finden' }).click();
  await page.locator('div').filter({ hasText: /^Filiale$/ }).click(); 
  await page.getByRole('textbox', { name: 'Nach Ort suchen' }).fill('Tobaj');
  await page.getByRole('button', { name: 'Suchen' }).click();
  await page.getByRole('link', { name: 'Mehr Details zu Wüstenrot Filiale Güssing' }).click();
  // verify address data
  await expect(page.getByText('Hauptstraße 16')).toBeVisible();
  await expect(page.getByText('7540 Güssing')).toBeVisible();
  // verify opening hours
  await page.getByText('08:00-12:00').nth(0).click(); // Montag
  await page.getByText('08:00-12:00').nth(1).click(); // Dienstag
  await page.getByText('08:00-12:00').nth(2).click(); // Mittwoch
  await page.getByText('08:00-12:00').nth(3).click(); // Donnerstag
  await page.getByText('08:00-12:00').nth(4).click(); // Freitag
});

test('checkLinkForCookieSettings', async ({ page }) => {

  // verify datenschutz link
  await expect(page.locator('a').filter({ hasText: 'Datenschutz' }).first()).toHaveAttribute('href', '/de/datenschutz.html')

  // verify cookie settings link
  await expect(page.locator('a').filter({ hasText: 'Cookie Einstellungen' }).first()).toHaveAttribute('href', '/de/cookies.html')
  
  // Current link
  //await expect(page.locator('a').filter({ hasText: 'Cookie Einstellungen' }).first()).toHaveAttribute('href', '#')

});