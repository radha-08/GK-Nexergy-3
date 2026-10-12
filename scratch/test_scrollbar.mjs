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

    // Check suggestion chips scroll before click
    const chipsScrollBefore = await page.evaluate(() => {
      const container = document.querySelector('.no-scrollbar');
      return container ? container.scrollLeft : null;
    });
    console.log('Chips scrollBefore:', chipsScrollBefore);

    // Click right arrow button ▶
    const rightArrow = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button[aria-label="Scroll right"]'));
      return btns[0] || null;
    });
    if (rightArrow) {
      await rightArrow.click();
      await new Promise(r => setTimeout(r, 400));
    }

    const chipsScrollAfterArrow = await page.evaluate(() => {
      const container = document.querySelector('.no-scrollbar');
      return container ? container.scrollLeft : null;
    });
    console.log('Chips scrollAfterArrow:', chipsScrollAfterArrow);

    // Click on slider track
    await page.evaluate(() => {
      const track = document.querySelector('[title="Click or drag to scroll suggestions"]');
      if (track) {
        const rect = track.getBoundingClientRect();
        // simulate click at 80% of width
        track.dispatchEvent(new MouseEvent('pointerdown', {
          bubbles: true,
          clientX: rect.left + rect.width * 0.8,
          clientY: rect.top + rect.height / 2
        }));
      }
    });
    await new Promise(r => setTimeout(r, 400));

    const chipsScrollAfterTrack = await page.evaluate(() => {
      const container = document.querySelector('.no-scrollbar');
      return container ? container.scrollLeft : null;
    });
    console.log('Chips scrollAfterTrack click:', chipsScrollAfterTrack);

    // Screenshot
    await page.screenshot({ path: 'scratch/chatbot_scrollbar_test.png' });
    console.log('Saved scratch/chatbot_scrollbar_test.png');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
  }
}

run();
