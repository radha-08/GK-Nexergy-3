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

    // Open chatbot
    const toggleBtn = await page.waitForSelector('[data-testid="floating-chatbot-toggle"]', { timeout: 10000 });
    await toggleBtn.click();
    await new Promise(r => setTimeout(r, 600));

    // Type and send a message to trigger AI response
    const input = await page.waitForSelector('[data-testid="ai-chat-input"]');
    await input.type('Tell me about the software solutions and academy courses');
    const sendBtn = await page.waitForSelector('[data-testid="ai-send-btn"]');
    await sendBtn.click();
    await new Promise(r => setTimeout(r, 1200));

    // Scroll up in the feed
    await page.evaluate(() => {
      const feed = document.querySelector('.gk-chat-feed-scroll');
      if (feed) {
        feed.scrollTop = 0;
      }
    });
    await new Promise(r => setTimeout(r, 300));

    await page.screenshot({ path: 'scratch/chatbot_vertical_scroll_test.png' });
    console.log('Saved scratch/chatbot_vertical_scroll_test.png');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
  }
}

run();
