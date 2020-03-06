const os = require('os');
const path = require('path');
const captureWebsite = require('capture-website');
const core = require('@actions/core');
const artifact = require('@actions/artifact');
const io = require('@actions/io');

(async () => {
  // Get URL to screenshot
  const url = core.getInput('url');

  // Get screenshot destination
  const destFolder = process.env.RUNNER_TEMP;
  const destFile = 'screenshot.png';
  const dest = path.join(destFolder, destFile);

  // Locate google-chrome
  const executablePath = await io.which('google-chrome');

  // Options for capture
  const options = {
    fullPage: core.getInput('full-page') === 'true' ? true : false,
    launchOptions: {
      executablePath
    }
  };

  // Capture and write to dest
  await captureWebsite.file(url, dest, options);

  // Create an artifact
  const artifactClient = artifact.create();
  const artifactName = core.getInput('artifact-name');
  const uploadResult = await artifactClient.uploadArtifact(artifactName, [dest], destFolder);

  // Expose the path to the screenshot as an output
  core.setOutput('path', dest);
})();
