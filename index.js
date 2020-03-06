const os = require('os');
const path = require('path');
const captureWebsite = require('capture-website');
const core = require('@actions/core');
const artifact = require('@actions/artifact');
const io = require('@actions/io');

(async () => {
  // Write to temporary directory
  const destFolder = process.env.RUNNER_TEMP;
  const destFile = 'screenshot.png';
  const dest = path.join(destFolder, destFile);

  // Locate google-chrome
  const executablePath = await io.which('google-chrome');

  // Capture and write to dest
  await captureWebsite.file('https://github.com/swinton', dest, {
    launchOptions: {
      executablePath
    }
  });

  // Create an artifact
  const artifactClient = artifact.create();
  const artifactName = core.getInput('artifact-name');
  const uploadResult = await artifactClient.uploadArtifact(artifactName, [dest], destFolder);

  // Expose the path to the screenshot as an output
  core.setOutput('path', dest);
})();
