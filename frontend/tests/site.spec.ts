import { expect, test } from '@playwright/test'

const layoutViewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet portrait', width: 768, height: 1024 },
  { name: 'compact phone portrait', width: 320, height: 568 },
  { name: 'standard iPhone portrait', width: 393, height: 852 },
  { name: 'large iPhone portrait', width: 440, height: 956 },
  { name: 'compact phone landscape', width: 667, height: 375 },
  { name: 'standard iPhone landscape', width: 852, height: 393 },
  { name: 'large iPhone landscape', width: 956, height: 440 },
]

for (const viewport of layoutViewports) {
  test(`${viewport.name} layout has no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const widths = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
    }))
    expect(widths.document).toBeLessThanOrEqual(widths.viewport)

    const sectionBounds = await page.locator('main > section').evaluateAll((sections) => sections.map((section) => {
      const rect = section.getBoundingClientRect()
      return { left: rect.left, right: rect.right }
    }))
    expect(sectionBounds.every(({ left, right }) => left >= -1 && right <= viewport.width + 1)).toBe(true)
  })
}

test('mobile navigation is usable in portrait and landscape', async ({ page }) => {
  for (const viewport of [
    { width: 393, height: 852 },
    { width: 852, height: 393 },
  ]) {
    await page.setViewportSize(viewport)
    await page.goto('/')

    const toggle = page.getByRole('button', { name: 'Open menu' })
    const toggleBox = await toggle.boundingBox()
    expect(toggleBox?.width).toBeGreaterThanOrEqual(44)
    expect(toggleBox?.height).toBeGreaterThanOrEqual(44)
    await toggle.click()

    const menu = page.getByRole('navigation', { name: 'Mobile navigation' })
    await expect(menu).toBeVisible()
    await expect(menu.getByRole('link')).toHaveCount(5)
    await expect.poll(() => menu.evaluate((element) => {
      const clip = getComputedStyle(element).clipPath
      return clip === 'none' || clip === 'inset(0px)'
    })).toBe(true)

    const contactLink = menu.getByRole('link', { name: /Contact/ })
    await contactLink.scrollIntoViewIfNeeded()
    await expect(contactLink).toBeInViewport()
    await contactLink.click()
    await expect(page.locator('#contact')).toBeInViewport()
  }
})

test('capability cards keep a stable height while the active card changes', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/#capabilities')

  const panels = page.locator('.capability-panel')
  const expectedHeight = await panels.first().evaluate((panel) => panel.getBoundingClientRect().height)
  await panels.nth(1).hover()

  for (const delay of [0, 100, 250, 600]) {
    if (delay) await page.waitForTimeout(delay)
    const heights = await panels.evaluateAll((items) => items.map((panel) => panel.getBoundingClientRect().height))
    expect(heights.every((height) => Math.abs(height - expectedHeight) < 1)).toBe(true)
  }
})

test('trade journey and industry carousel use the intended responsive counts', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')

  await expect(page.locator('.process-card')).toHaveCount(6)
  const desktopCards = await page.locator('.industry-card').evaluateAll((cards) => cards.map((card) => {
    const rect = card.getBoundingClientRect()
    return { left: rect.left, right: rect.right }
  }))
  expect(desktopCards[3].right).toBeLessThanOrEqual(1440)
  expect(desktopCards[4].left).toBeGreaterThanOrEqual(1439)
  await expect(page.locator('.network-world-map')).toBeVisible()

  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  const mobileCardLocator = page.locator('.industry-card')
  await expect(mobileCardLocator).toHaveCount(6)
  const mobileCards = await mobileCardLocator.evaluateAll((cards) => cards.map((card) => {
    const rect = card.getBoundingClientRect()
    return { left: rect.left, right: rect.right }
  }))
  expect(mobileCards[0].right).toBeLessThanOrEqual(390)
  expect(mobileCards[0].right - mobileCards[0].left).toBeGreaterThanOrEqual(390 * 0.75)
  expect(mobileCards[1].left).toBeLessThan(390)
  expect(await page.locator('.industry-rail').evaluate((rail) => getComputedStyle(rail).scrollbarWidth)).toBe('none')
})

test('mobile capability content is never clipped', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto('/#capabilities')

  const panels = page.locator('.capability-panel')
  for (let index = 0; index < await panels.count(); index += 1) {
    await panels.nth(index).click()
    await expect(panels.nth(index)).toHaveAttribute('aria-pressed', 'true')
    expect(await panels.nth(index).evaluate((panel) => panel.scrollHeight <= panel.clientHeight + 1)).toBe(true)
  }
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
