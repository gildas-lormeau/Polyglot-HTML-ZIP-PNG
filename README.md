# Introduction

This repository contains a presentation showing how to create HTML/ZIP/PNG polyglot files in JavaScript. This is a work in progress.

You can view the presentation in:
 - [english](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/en-EN/)
 - [french](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/fr-FR/)
 
Here is the resulting file: [demo.png.zip.html](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/demo.png.zip.html). This file is compatible with HTML (in Standards Mode), PNG, and ZIP. The image displayed at the center of the HTML page is the page itself but interpreted as a PNG file.

# Installation

If you're using a Chromium-based browsers, you should install the extension located in [util/web-extension](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/tree/main/util/web-extension) to add the support of `file://` URIs in the `fetch` API.