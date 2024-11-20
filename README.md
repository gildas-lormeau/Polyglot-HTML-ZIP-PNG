# HTML Meets ZIP Meets PNG: When Files Have More Layers Than an Onion

## Introduction

Imagine a digital chameleon: a file that combines ZIP, HTML, and PNG into one versatile format. It can be displayed as a web page, unzipped to obtain all the page's resources, or viewed as an image. 

Discover an innovative approach to sharing and storing web content, and learn how to create these polyglot files in JavaScript!

## Presentation

You can view the web presentation in:
 - [english](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/en-EN/dist/presentation-polyglot-png-zip-html_en-EN.html) ([download](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/en-EN/dist/presentation-polyglot-png-zip-html_en-EN.html))
 - [french](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/fr-FR/dist/presentation-polyglot-png-zip-html_fr-FR.html) ([download](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/fr-FR/dist/presentation-polyglot-png-zip-html_fr-FR.html))

Press `F1` during the presentation to see the keyboard shortcuts.

## TL;DR
 
Here is the resulting self-extracting HTML file: [demo.png.zip.html](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/demo.png.zip.html)

This file and the presentation files are compatible with: 
 - HTML (displays the extracted page in [no-quirks mode](https://dom.spec.whatwg.org/#concept-document-no-quirks))
 - ZIP (contains the displayed page and its resources) - rename the file to `.zip` and view it with [ZIP Manager](https://gildas-lormeau.github.io/zip-manager/)
 - PNG - rename the file to `.png` and view it with [PNG file chunk inpector](https://www.nayuki.io/page/png-file-chunk-inspector)

If you are intrigued or more curious, you can also view it with [HexEd.it](https://hexed.it).

The presentation explains how to generate this file and the technical challenges involved.

Fun fact: the image displayed at the center of the page [demo.png.zip.html](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/demo.png.zip.html) is the page itself, but interpreted as a PNG file (cf. the `<img src="#" ...>` tag).

## Viewing the presentation in Chromium (and WebKit) browsers

You should [install the extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) from the zip file located in [util/web-extension](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/tree/main/util/web-extension) in order to add the support of `file://` URIs in the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), and run the first examples from the presentation. 

Alternatively, you can view the examples via an HTTP server. 

This issue is addressed in the subsequent examples of the presentation.

## Creation of polyglot files with single-file

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
 - Depending on the browser you're using, the presentation may be a little slow.

## Thank You

This presentation is dedicated to my biggest supporter on this project. Many thanks [@ljonathanl](https://github.com/ljonathanl), we miss your enthusiasm and creativity.
