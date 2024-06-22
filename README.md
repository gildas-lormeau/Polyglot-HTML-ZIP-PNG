# Introduction

This [code repository](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/) contains a step-by-step presentation for [RennesJS](https://www.meetup.com/fr-FR/RennesJS), showing how to create HTML/ZIP/PNG [polyglot files](https://en.wikipedia.org/wiki/Polyglot_(computing)) in JavaScript.

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
  
# Fun fact

The image displayed at the center of the page when viewed in HTML is the page itself, but interpreted as a PNG file.

# Installation

If you are using a Chromium-based or a WebKit-based browser to view examples from the presentation, you should install the extension from the zip file located in [util/web-extension](https://github.com/gildas-lormeau/Polyglot-HTML-ZIP-PNG/tree/main/util/web-extension) in order to add the support of `file://` URIs in the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

# Known issues

A bug in "Archive Utility" on macOS prevents it from decompressing the resulting file. You can use "unzip" to get around this issue.