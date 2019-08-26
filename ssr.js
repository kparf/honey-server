const puppeteer = require('puppeteer');

async function ssr(url) {

  const start = Date.now();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, {waitUntil: 'networkidle0'});

  } catch (err) {
    throw new Error('timed out error!');
  }

  const html = await page.content(); 
  await browser.close();

  const ttRenderMs = Date.now() - start;

  return { html, ttRenderMs };
}

module.exports = ssr;