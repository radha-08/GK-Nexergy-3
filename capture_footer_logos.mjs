import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });
  const page = await browser.newPage();
  
  // 1. Dark mode
  await page.goto('http://localhost:3003/home', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'dark');
    document.documentElement.classList.add('dark');
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 600));
  const footerDark = await page.$('.site-footer');
  if (footerDark) {
    await footerDark.screenshot({
      path: 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\8d8180ef-643c-430a-a4f4-2046f33c90f7\\footer_dark_screenshot.png'
    });
  }

  // 2. Light mode
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'light');
    document.documentElement.classList.remove('dark');
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 600));
  const footerLight = await page.$('.site-footer');
  if (footerLight) {
    await footerLight.screenshot({
      path: 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\8d8180ef-643c-430a-a4f4-2046f33c90f7\\footer_light_screenshot.png'
    });
  }

  await browser.close();
  console.log('Footer screenshots captured!');
}

test();
