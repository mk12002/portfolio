import { chromium } from 'playwright'
const BASE = 'http://localhost:4173'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1100, height: 1000 } })
await ctx.addInitScript(() => localStorage.setItem('portfolio-theme-mode', 'dark'))
const page = await ctx.newPage()
await page.goto(BASE + '/certificates', { waitUntil: 'networkidle' })
await page.waitForTimeout(6500) // allow API timeout -> fallback
const t = await page.evaluate(() => document.body.innerText)
console.log('Has new cert (Apps and Agents):', /Apps and Agents Developer/.test(t))
console.log('Data Scientist shows Expired:', /Expired/.test(t))
// scroll to trigger animations
const h = await page.evaluate(() => document.body.scrollHeight)
for (let y = 0; y < h; y += 700) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(200) }
await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400)
await page.screenshot({ path: 'shots/certs.png', fullPage: true })
await browser.close()
console.log('done')
