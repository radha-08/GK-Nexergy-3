import puppeteer from 'puppeteer';

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating to http://localhost:5173/home...');
  await page.goto('http://localhost:5173/home', { waitUntil: 'networkidle0', timeout: 30000 });

  // Click chatbot button
  console.log('Opening chatbot...');
  const chatToggle = await page.waitForSelector('[data-testid="floating-chatbot-toggle"]', { timeout: 10000 });
  await chatToggle.click();

  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({ path: 'chatbot_view.png' });
  console.log('Saved screenshot to chatbot_view.png');

  await browser.close();
}

main().catch(console.error);
