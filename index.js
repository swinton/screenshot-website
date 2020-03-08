const path = require('path');
const captureWebsite = require('capture-website');
const core = require('@actions/core');
const artifact = require('@actions/artifact');
const io = require('@actions/io');

async function run() {
  try {
    // Get source to screenshot
    const source = core.getInput('source');

    // Get destination
    const destFolder = process.env.RUNNER_TEMP;
    const destFile = core.getInput('destination');
    const dest = path.join(destFolder, destFile);

    // Locate Google Chrome executable
    // "google-chrome" on Linux
    // "chrome.exe" on Windows
    // "Google Chrome" on macOSs
    const executables = {
      Linux: '/usr/bin/google-chrome',
      Windows: 'chrome.exe',
      macOS: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    };
    const executablePath = executables[process.env.RUNNER_OS];
    core.debug(`executablePath is ${executablePath}`);

    // Options for capture
    const options = {
      fullPage: core.getInput('full-page') === 'true',
      launchOptions: {
        executablePath
      }
    };

    // Capture and write to dest
    await captureWebsite.file(source, dest, options);

    // Create an artifact
    const artifactClient = artifact.create();
    const artifactName = destFile.substr(0, destFile.lastIndexOf('.'));
    const uploadResult = await artifactClient.uploadArtifact(artifactName, [dest], destFolder);

  // Expose the path to the screenshot as an output
  core.setOutput('path', dest);  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
