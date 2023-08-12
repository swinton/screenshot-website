const yaml = require("js-yaml");

function normalizeInputName(inputName) {
  const chars = inputName.toLowerCase().split('');
  let normalized = '';

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const prevChar = i > 0 ? chars[i-1] : '';
    if (char !== '-') {
      if (prevChar === '-') {
        normalized += char.toUpperCase();
      } else {
        normalized += char;
      }
    }
  }
  return normalized;
}

function normalizeInputValue(inputName, inputValue) {
  return yaml.load(inputValue);
}

// Thank you, octokit/request-action :bow:
// https://github.com/octokit/request-action/blob/a43ad662a5c7b9f83ff18ff5d40564f214c23925/index.js#L41-L52
function loadInputs() {
  return Object.entries(process.env).reduce((result, [key, value]) => {
    if (!/^INPUT_/.test(key)) return result;

    const inputName = normalizeInputName(key.substr("INPUT_".length));

    result[inputName] = normalizeInputValue(inputName, value);

    return result;
  }, {});
}

module.exports = loadInputs;
