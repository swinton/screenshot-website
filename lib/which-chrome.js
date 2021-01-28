const io = require('@actions/io');

async function whichChrome() {
  // Locate Google Chrome executable
  // "google-chrome" on Linux
  // "chrome.exe" on Windows
  // "Google Chrome" on macOSs
  const executables = {
    Linux: 'google-chrome',
    Windows: 'chrome.exe',
    macOS: 'Google Chrome',
  };

  return io.which(executables[process.env.RUNNER_OS]);
}

module.exports = whichChrome;
