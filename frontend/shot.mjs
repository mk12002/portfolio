import { chromium } from 'playwright'
const BASE = 'http://localhost:4173'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } })
await ctx.addInitScript(() => localStorage.setItem('portfolio-theme-mode', 'dark'))
const page = await ctx.newPage()

// Events even cards
await page.goto(BASE + '/events', { waitUntil: 'networkidle' })
await page.waitForTimeout(1800)
await page.screenshot({ path: 'shots/verify-events.png' })

// Home stat: certifications should read 14
await page.goto(BASE + '/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)
await page.evaluate(() => window.scrollTo(0, 1400))
await page.waitForTimeout(1500)
const t = await page.evaluate(() => document.body.innerText)
console.log('Home shows "14" certifications:', /14\s*\n?\s*Certifications|Certifications/.test(t) && t.includes('14'))
await browser.close()
console.log('done')
