import puppeteer from 'puppeteer-core';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 850 }
  });

  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 600));

  // Click Discover the Vision to go to /home
  const enterBtn = await page.waitForSelector('[data-testid="discover-vision-btn"]', { timeout: 8000 });
  await enterBtn.click();
  await new Promise(r => setTimeout(r, 1000));

  // Clear sessionStorage to ensure fresh welcome message
  await page.evaluate(() => {
    sessionStorage.clear();
  });

  // Open chatbot
  const toggleBtn = await page.waitForSelector('[data-testid="floating-chatbot-toggle"]', { timeout: 8000 });
  await toggleBtn.click();
  await new Promise(r => setTimeout(r, 800));

  // Screenshot
  await page.screenshot({
    path: 'C:\\Users\\ravir\\.gemini\\antigravity-ide\\brain\\1e4d900b-6d37-4e56-9ae1-1e274c591c7c\\chatbot_exact_look.png'
  });

  console.log('Successfully captured screenshot to chatbot_exact_look.png');
  await browser.close();
}

capture().catch(console.error);
