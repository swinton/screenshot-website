const captureWebsite = require('capture-website');
const core = require('@actions/core');

(async () => {
  await captureWebsite.file('https://github.com/swinton', `${ __dirname }/screenshot.png`, {launchOptions: {executablePath: '/usr/bin/google-chrome'}});
  core.setOutput('path', `${ __dirname }/screenshot.png`);
})();
