import puppeteer from 'puppeteer-core';
import path from 'path';

const EDGE_BIN = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const ARTIFACTS_DIR = 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\8d8180ef-643c-430a-a4f4-2046f33c90f7';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_BIN,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // Desktop 1440x900
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3003/home', { waitUntil: 'networkidle0', timeout: 30000 });
  
  await page.evaluate(() => {
    const el = document.getElementById('pages-stack-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1200));

  const desktopShot = path.join(ARTIFACTS_DIR, 'nav_stack_centered_view.png');
  await page.screenshot({ path: desktopShot });
  console.log('Saved Desktop Centered Stack:', desktopShot);

  await browser.close();
}

capture().catch(console.error);
