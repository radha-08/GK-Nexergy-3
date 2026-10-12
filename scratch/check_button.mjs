import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait 500ms for animations
    await new Promise(r => setTimeout(r, 600));

    // Capture floating button area
    const button = await page.waitForSelector('[data-testid="floating-chatbot-toggle"]');
    await button.screenshot({ path: 'scratch/button_design_check.png' });
    console.log('Saved scratch/button_design_check.png');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
  }
}

run();
