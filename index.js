const puppeteer = require('puppeteer');
const core = require('@actions/core');

(async () => {
  const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome'});
  const page = await browser.newPage();
  await page.goto('https://github.com/swinton');

  await page.screenshot({path: `${ __dirname }/swinton.png`, fullPage: true});

  await browser.close();

  core.setOutput('path', `${ __dirname }/swinton.png`);
})();
