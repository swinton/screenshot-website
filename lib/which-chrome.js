async function whichChrome() {
  // Locate Google Chrome executable
  // "google-chrome" on Linux
  // "chrome.exe" on Windows
  // "Google Chrome" on macOSs
  const executables = {
    Linux: '/usr/bin/google-chrome',
    Windows: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    macOS: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  };

  return executables[process.env.RUNNER_OS];
}

module.exports = whichChrome;
