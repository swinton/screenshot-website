# :camera_flash: `screenshot-website`
> A GitHub Action to capture screenshots of a website, across Windows, Mac, and Linux

## Usage

```yaml
- name: Screenshot Website
  uses: swinton/screenshot-website@v1
  with:
    source: https://github.com/swinton/screenshot-website
    destination: screenshot.png
```

## Options

_Most_ of the options listed [here](https://github.com/sindresorhus/capture-website#options) (`inputType`, `width`, `height`, etc.) are also supported, just pass in a [kebab-cased](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles) equivalent, e.g. for [`fullPage`](https://github.com/sindresorhus/capture-website#fullpage):

```yaml
- name: Screenshot Website
  uses: swinton/screenshot-website@v1
  with:
    source: https://github.com/swinton/screenshot-website
    destination: screenshot.png
    full-page: true
```

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
