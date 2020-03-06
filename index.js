const path = require('path');
const captureWebsite = require('capture-website');
const core = require('@actions/core');

(async () => {
  const dest = path.join(os.tmpdir(), 'screenshot.png');

  await captureWebsite.file('https://github.com/swinton', dest, {launchOptions: {executablePath: '/usr/bin/google-chrome'}});
  core.setOutput('path', dest);
})();
