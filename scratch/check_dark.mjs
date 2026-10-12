import puppeteer from 'puppeteer-core';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
    defaultViewport: { width: 1280, height: 850 }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173/about', { waitUntil: 'load', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1000));
  
  // Set dark mode
  await page.evaluate(() => {
    localStorage.setItem('gk-theme', 'dark');
    document.documentElement.classList.add('dark');
  });
  await page.reload({ waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 1000));

  // Click chatbot toggle button
  const toggle = await page.$('[data-testid="floating-chatbot-toggle"]');
  if (toggle) {
    await toggle.click();
    await new Promise(r => setTimeout(r, 1000));
  }

  await page.screenshot({ path: 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\1e4d900b-6d37-4e56-9ae1-1e274c591c7c\\chatbot_dark_live_check.png' });
  console.log('Done dark mode screenshot');
  await browser.close();
}

capture().catch(console.error);
