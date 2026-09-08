import { expect, test } from '@playwright/test'

for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`${viewport.name} layout has no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const widths = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
    }))
    expect(widths.document).toBeLessThanOrEqual(widths.viewport)
  })
}

test('mobile navigation opens and reaches every section', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()

  const menu = page.getByRole('navigation', { name: 'Mobile navigation' })
  await expect(menu).toBeVisible()
  await expect(menu.getByRole('link')).toHaveCount(5)
  await expect.poll(() => menu.evaluate((element) => {
    const clip = getComputedStyle(element).clipPath
    return clip === 'none' || clip === 'inset(0px)'
  })).toBe(true)
  await menu.getByRole('link', { name: /Contact/ }).click()
  await expect(page.locator('#contact')).toBeInViewport()
})

test('contact form reports errors and validates complete input', async ({ page }) => {
  await page.goto('/#contact')
  const form = page.locator('.contact-form')
  await form.getByRole('button', { name: 'Send enquiry' }).click()

  await expect(form.locator('.field-error')).toHaveCount(3)
  await form.getByLabel(/Name/).fill('Harsh Kumar')
  await form.getByLabel(/Email/).fill('harsh@example.com')
  await form.getByLabel(/Your requirement/).fill('We need help sourcing customized industrial components.')
  await form.getByRole('button', { name: 'Send enquiry' }).click()

  await expect(form.getByRole('status')).toContainText('Your details are valid.')
  await expect(form.getByRole('status')).toContainText('Email delivery will be connected')
})
