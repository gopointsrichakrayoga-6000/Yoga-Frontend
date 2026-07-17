const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/Hamdaan/.gemini/antigravity/brain/5266fd60-ceab-4873-9b71-1cae376ac589';

async function waitForServer(url, maxRetries = 30, delayMs = 1500) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 200 || res.status === 404) {
        console.log(`[READY] Server up at ${url}`);
        return true;
      }
    } catch (err) {
      // Waiting for server...
    }
    await new Promise(r => setTimeout(r, delayMs));
  }
  throw new Error(`Server not reachable at ${url} after retries.`);
}

async function run() {
  console.log('Waiting for backend and frontend servers...');
  await waitForServer('http://localhost:8081/api/categories');
  await waitForServer('http://localhost:5173/');

  console.log('Launching Puppeteer browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Helper to take screenshot with small delay for animations/images to settle
  async function screenshot(urlPath, filename) {
    console.log(`Capturing ${filename} (${urlPath})...`);
    await page.goto(`http://localhost:5173${urlPath}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000)); // Allow animations/fonts/API images to settle and render cleanly
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, filename), fullPage: false });
    console.log(`Saved ${filename}`);
  }

  try {
    // 1. Logged Out Desktop Screenshots (1440px)
    await screenshot('/', 'home_desktop.png');
    await screenshot('/gallery', 'gallery_logged_out_desktop.png');
    await screenshot('/videos', 'videos_logged_out_desktop.png');
    await screenshot('/about', 'about_desktop.png');
    await screenshot('/contact', 'contact_desktop.png');
    await screenshot('/login', 'login_desktop.png');
    await screenshot('/register', 'register_desktop.png');

    // Perform Login via UI
    console.log('Logging in as Admin via /login form...');
    await page.goto('http://localhost:5173/login', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 1000));

    // Type credentials directly
    await page.type('input[type="email"]', 'admin@pranavdhyan.org');
    await page.type('input[type="password"]', 'Password123!');
    await page.click('button[type="submit"]');

    // Wait for redirect or token in localStorage
    await page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 5000 }).catch(() => {});
    await new Promise(r => setTimeout(r, 2000));

    // 2. Logged In Desktop Screenshots (1440px)
    await screenshot('/gallery', 'gallery_logged_in_desktop.png');
    await screenshot('/videos', 'videos_logged_in_desktop.png');
    await screenshot('/admin', 'admin_dashboard_desktop.png');

    // 3. Mobile Screenshots (375px)
    console.log('Switching viewport to mobile width (375x812)...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });

    await screenshot('/', 'home_mobile.png');
    await screenshot('/gallery', 'gallery_mobile.png');

    // Log out before capturing mobile login page
    console.log('Logging out for mobile login screenshot...');
    await page.evaluate(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    });
    await screenshot('/login', 'login_mobile.png');

    console.log('All screenshots captured successfully!');
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
