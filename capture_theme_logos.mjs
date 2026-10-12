import puppeteer from 'puppeteer-core';

async function verifyLogos() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    defaultViewport: { width: 1440, height: 900 }
  });

  const page = await browser.newPage();
  
  // 1. Check Light Mode
  await page.goto('http://localhost:3003/home', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'light');
    document.documentElement.classList.remove('dark');
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\8d8180ef-643c-430a-a4f4-2046f33c90f7\\navbar_light_mode_logo.png',
    clip: { x: 0, y: 0, width: 1440, height: 120 }
  });

  // Scroll to footer in Light Mode
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\8d8180ef-643c-430a-a4f4-2046f33c90f7\\footer_light_mode_logo.png',
    clip: { x: 0, y: 800, width: 600, height: 100 }
  });

  // 2. Check Dark Mode
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\8d8180ef-643c-430a-a4f4-2046f33c90f7\\navbar_dark_mode_logo.png',
    clip: { x: 0, y: 0, width: 1440, height: 120 }
  });

  // Scroll to footer in Dark Mode
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\8d8180ef-643c-430a-a4f4-2046f33c90f7\\footer_dark_mode_logo.png',
    clip: { x: 0, y: 800, width: 600, height: 100 }
  });

  console.log('Successfully captured light and dark mode logo screenshots!');
  await browser.close();
}

verifyLogos().catch(console.error);
