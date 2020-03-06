const path = require('path');
const captureWebsite = require('capture-website');
const core = require('@actions/core');
const artifact = require('@actions/artifact');

(async () => {
  // Write to temporary directory
  const destFolder = os.tmpdir();
  const destFile = 'screenshot.png';
  const dest = path.join(destFolder, destFile);

  // Capture and write to dest
  await captureWebsite.file('https://github.com/swinton', dest, {launchOptions: {executablePath: '/usr/bin/google-chrome'}});

  // Create an artifact
  const artifactClient = artifact.create();
  const artifactName = core.getInput('artifact-name');
  const uploadResult = await artifactClient.uploadArtifact(artifactName, [destFile], destFolder);
})();
