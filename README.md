# Introduction

This [code repository](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/) contains a presentation for [RennesJS](https://www.meetup.com/fr-FR/RennesJS) showing how to create HTML/ZIP/PNG [polyglot files](https://en.wikipedia.org/wiki/Polyglot_(computing)) in JavaScript step by step.

# Presentation

You can view the presentation in:
 - [english](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/en-EN/)
 - [french](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/fr-FR/)

# Demo
 
Here is the resulting file: [demo.png.zip.html](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/demo.png.zip.html)

This file is compatible with: 
 - HTML (page displayed in [no-quirks mode](https://dom.spec.whatwg.org/#concept-document-no-quirks))
 - ZIP
 - PNG

The image displayed at the center of the HTML page is the page itself but interpreted as a PNG file.

# Installation

If you are using a Chromium-based browser to view the presentation and test examples, you should install the extension as an "[unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)" from the zip file located in [util/web-extension](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/tree/main/util/web-extension) in order to add the support of `file://` URIs in the `fetch` API.

# Known issues

A bug in "Archive Utility" on macOS prevents it from decompressing the resulting file. You can use "unzip" from the command line to get around this problem.