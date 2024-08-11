# Introduction

This repository contains a step-by-step presentation for [RennesJS](https://www.meetup.com/fr-FR/RennesJS), showing how to create HTML/ZIP/PNG [polyglot files](https://en.wikipedia.org/wiki/Polyglot_(computing)) in JavaScript.

The [presentation](#presentation) provides a didactic explanation of how (universal) self-extracting files work in [SingleFile](https://github.com/gildas-lormeau/SingleFile).

# TL;DR
 
Here is the resulting self-extracting HTML file: [demo.png.zip.html](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/raw/main/demo.png.zip.html)

Here is a similar online page: https://gildas-lormeau.github.io

This file is compatible with: 
 - HTML (extracted page displayed in [no-quirks mode](https://dom.spec.whatwg.org/#concept-document-no-quirks))
 - ZIP (contains the displayed page and its resources) - view it with [ZIP Manager](https://gildas-lormeau.github.io/zip-manager/)
 - PNG - view it with [PNG file chunk inpector](https://www.nayuki.io/page/png-file-chunk-inspector)

# Fun fact

The image displayed at the center of the page `demo.png.zip.html` when viewed in HTML is the page itself, but interpreted as a PNG file.

# Presentation

You can view the web presentation (as self-extractring files) in:
 - [english](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/en-EN/dist/) ([code examples](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/tree/main/en-EN/code))
 - [french](https://gildas-lormeau.github.io/Polyglot-HTML-ZIP-PNG/fr-FR/dist/) ([code examples](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/tree/main/fr-FR/code))

Note that these presentations can be saved for offline consultation.

# Installation

If you are using a Chromium-based or a WebKit-based browser to view the first examples from the presentation, you should install the extension from the zip file located in [util/web-extension](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/tree/main/util/web-extension) in order to add the support of `file://` URIs in the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Alternatively, you can open the examples via an HTTP server.

# Known issues

 - A bug in "Archive Utility" on macOS prevents it from decompressing the resulting file. You can use "unzip" to get around this issue.
 - Depending on the browser you're using, the presentation may be a little slow.
