# Learn How to Create HTML/ZIP/PNG Polyglot Files in JavaScript

## Table of Contents

- [Introduction](#introduction)
- [Presentation](#presentation)
- [TL;DR](#tldr)
  - [Resulting File](#resulting-file)
  - [Summary](#summary)
  - [File Compatibility](#file-compatibility)
  - [Fun Fact](#fun-fact)
- [Viewing the Presentation in Chromium (and WebKit) Browsers](#viewing-the-presentation-in-chromium-and-webkit-browsers)
- [Creation of Polyglot Files with SingleFile](#creation-of-polyglot-files-with-singlefile)
- [Known Issues](#known-issues)
- [Thank You](#thank-you)

## Introduction

Imagine a digital chameleon: a file that combines ZIP, HTML, and PNG into one versatile format. It can be displayed as a web page, unzipped to obtain all the page's resources, or viewed as an image. 

Discover an innovative approach to sharing and storing web content, and learn how to create these polyglot files in JavaScript!

## Presentation

You can view the web presentation in:
 - [english](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/en-EN/dist/presentation-polyglot-png-zip-html_en-EN.html) ([download](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/en-EN/dist/presentation-polyglot-png-zip-html_en-EN.html))
 - [french](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/fr-FR/dist/presentation-polyglot-png-zip-html_fr-FR.html) ([download](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/fr-FR/dist/presentation-polyglot-png-zip-html_fr-FR.html)) ([video](https://www.youtube.com/watch?v=XjOGPnPP6eQ))

Press `F1` during the presentation to see the keyboard shortcuts.

## TL;DR

### Resulting File

- download file: [demo.png.zip.html](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/demo.png.zip.html)
- view page: [demo.png.zip.html](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/demo.png.zip.html)

### Summary

 - [english](SUMMARY.md) ([pdf](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/SUMMARY.pdf))
 - [french](./fr-FR/RESUME.md) ([pdf](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/fr-FR/RESUME.pdf))

### File Compatibility

This file and the presentation files are compatible with: 
 - HTML (displays the extracted page in [no-quirks mode](https://dom.spec.whatwg.org/#concept-document-no-quirks))
 - ZIP (contains the displayed page and its resources) - rename the file to `.zip` and view it with [ZIP Manager](https://gildas-lormeau.github.io/zip-manager/)
 - PNG - rename the file to `.png` and view it with [PNG file chunk inpector](https://www.nayuki.io/page/png-file-chunk-inspector)

If you are intrigued or more curious, you can also view it with [HexEd.it](https://hexed.it).

The presentation explains how to generate this file and the technical challenges involved.

### Fun Fact

The image displayed at the center of the page [demo.png.zip.html](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/demo.png.zip.html) is the page itself, but interpreted as a PNG file (cf. the `<img src="#" ...>` tag).

## Viewing the Presentation in Chromium (and WebKit) Browsers

You should [install the extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) from the zip file located in [util/web-extension](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/tree/main/util/web-extension) in order to add the support of `file://` URIs in the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and run the first examples from the presentation. 

Alternatively, you can view the examples via an HTTP server. 

This issue is addressed in the subsequent examples of the presentation.

## Creation of Polyglot Files with SingleFile

- from the browser

Install [SingleFile](https://github.com/gildas-lormeau/SingleFile?tab=readme-ov-file#install), select in the options page `File format > format > self-extracting ZIP (universal)` and enable `File format > format > embed image`.

- from the command line interface

Install [`single-file-cli`](https://www.npmjs.com/package/single-file-cli) from NPM and run `single-file` as shown below.

```sh
npm install single-file-cli
npx single-file \
  --compress-content \
  --self-extracting-archive \
  --embedded-image=./image.png \
  --dump-content \
  https://www.example.com > output.png.zip.html
```

## Known Issues

 - A bug in "Archive Utility" on macOS prevents it from decompressing the resulting file. You can use `unzip` to get around this issue.
 - The HTML page cannot be viewed when opened from the filesystem on iOS because the page is displayed by default in a viewer which does not support JavaScript. Installing a third-party browser can help you get around this problem.
 - Depending on the browser you're using, the presentation may be a little slow.

## Thank You

This presentation is dedicated to my biggest supporter on this project. Many thanks [@ljonathanl](https://github.com/ljonathanl), we miss your enthusiasm and creativity.
