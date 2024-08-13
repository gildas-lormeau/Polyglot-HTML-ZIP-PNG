# Introduction

This repository contains a step-by-step presentation for [RennesJS](https://www.meetup.com/fr-FR/RennesJS), showing how to create HTML/ZIP/PNG [polyglot files](https://en.wikipedia.org/wiki/Polyglot_(computing)) in JavaScript.

The presentation provides a didactic explanation of how (universal) self-extracting files work in [SingleFile](https://github.com/gildas-lormeau/SingleFile).

# Presentation

You can view the web presentation in:
 - [english](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/en-EN/dist/presentation-polyglot-png-zip-html_en-EN.html) ([download](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/en-EN/dist/presentation-polyglot-png-zip-html_en-EN.html))
 - [french](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/fr-FR/dist/presentation-polyglot-png-zip-html_fr-FR.html) ([download](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/fr-FR/dist/presentation-polyglot-png-zip-html_fr-FR.html))

Press `F1` during the presentation to see the keyboard shortcuts.

This presentation is dedicated to my biggest supporter on this project. Many thanks [@ljonathanl](https://github.com/ljonathanl), we miss your enthusiasm.

# Installation

If you are using a Chromium-based or a WebKit-based browser to view the first examples from the presentation, you should [install the extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) from the zip file located in [util/web-extension](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/tree/main/util/web-extension) in order to add the support of `file://` URIs in the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Alternatively, you can open the examples via an HTTP server.

# TL;DR
 
Here is the resulting self-extracting HTML file: [demo.png.zip.html](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/demo.png.zip.html)

This file and the presentation files are compatible with: 
 - HTML (extracted page displayed in [no-quirks mode](https://dom.spec.whatwg.org/#concept-document-no-quirks))
 - ZIP (contains the displayed page and its resources) - rename the file to `.zip` and view it with [ZIP Manager](https://gildas-lormeau.github.io/zip-manager/)
 - PNG -  rename the file to `.png` and view it with [PNG file chunk inpector](https://www.nayuki.io/page/png-file-chunk-inspector)

If you are intrigued or more curious, you can also view it on [https://hexed.it](https://hexed.it).

The presentation explains how to generate this file and the technical challenges involved.

# Fun fact

The image displayed at the center of the page [demo.png.zip.html](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/demo.png.zip.html) when viewed in HTML is the page itself, but interpreted as a PNG file (cf. the `<img src="#" ...>` tag).

# Known issues

 - A bug in "Archive Utility" on macOS prevents it from decompressing the resulting file. You can use `unzip` to get around this issue.
 - Depending on the browser you're using, the presentation may be a little slow.
