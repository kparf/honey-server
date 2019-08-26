const puppeteer = require('puppeteer');
const delScripts = require('./delete-scripts.json');

async function ssr(url) {

  const start = Date.now();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, {waitUntil: 'networkidle0'});

  } catch (err) {
    throw new Error('timed out error!');
  }

  await page.evaluate(() => {
    document.querySelector(`script[src="https://get.mavo.io/mavo.es5.min.js"]`).remove();
    document.querySelector(`link[href="https://get.mavo.io/mavo.css"]`).remove();
    document.querySelector(`.mv-bar.mv-ui`).remove();
  });

  const html = await page.content(); 
  await browser.close();

  const ttRenderMs = Date.now() - start;

  return { html, ttRenderMs };
}

module.exports = ssr;