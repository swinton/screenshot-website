# :camera_flash: `screenshot-website` ![](https://github.com/swinton/screenshot-website/workflows/Tests/badge.svg)
> A GitHub Action to capture screenshots of a website, across Windows, Mac, and Linux

## Contents
- [Usage](#usage)
- [Inputs](#inputs)
- [Outputs](#outputs)
- [Advanced Usage](#advanced-usage)
- [Credits](#credits)

## Usage

```yaml
- name: Screenshot Website
  uses: swinton/screenshot-website@v1
  with:
    source: https://github.com/swinton/screenshot-website
    destination: screenshot.png
```

## Inputs

### Required inputs

1. `source`: Source of the content to be captured, may be a URL or HTML string, e.g. `https://example.com/`
1. `destination`: Destination filename the captured website will be written to, defaults to `screenshot.png`

### Optional inputs

_Most_ of the options listed [here](https://github.com/sindresorhus/capture-website#options) (`inputType`, `width`, `height`, etc.) can be passed as inputs, just pass in a [kebab-cased](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles) equivalent, e.g. `full-page` for [`fullPage`](https://github.com/sindresorhus/capture-website#fullpage):

```yaml
- name: Screenshot Website
  uses: swinton/screenshot-website@v1
  with:
    source: https://github.com/swinton/screenshot-website
    destination: screenshot.png
    full-page: true
```

## Outputs

An [artifact](https://help.github.com/en/actions/configuring-and-managing-workflows/persisting-workflow-data-using-artifacts) will be created automatically for each screenshot captured. The following additional outputs are also supported:

1. `path`: The filesystem path to the captured screenshot

## Advanced Usage

Use a matrix to capture screenshots across different operating systems, e.g.

```yaml
jobs:
  screenshot:
    name: Screenshot
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
    runs-on: ${{ matrix.os }}

    steps:

    - name: Screenshot Website
      uses: swinton/screenshot-website@v1
      with:
        source: https://github.com/swinton/screenshot-website
        destination: screenshot-${{ matrix.os }}.png
```

Combine a matrix with additional options such as width, e.g.

```yaml
jobs:
  screenshot:
    name: Screenshot
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        width: [1200, 992, 768, 600]
    runs-on: ${{ matrix.os }}

    steps:

    - name: Screenshot Website
      uses: swinton/screenshot-website@v1
      with:
        source: https://github.com/swinton/screenshot-website
        destination: screenshot-${{ matrix.os }}-${{ matrix.width }}.png
        width: ${{ matrix.width }}
```


## Credits

- :bow: https://github.com/sindresorhus/capture-website
