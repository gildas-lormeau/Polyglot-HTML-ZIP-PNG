import { minifyScript } from "./utils.js";
// The zip.js script
const ZIP_JS_SCRIPT = await (await fetch("assets/zip.min.js")).text();
// The main script for the page extraction
const MAIN_SCRIPT = await (await fetch("assets/page-extraction.js")).text();

// The HTML template for the output file
const template = [`<!DOCTYPE html>
<html>
  <head>
    <meta charset=utf-8>
    <title>Please wait...</title>
    <script>${ZIP_JS_SCRIPT}</script>
    <script>zip.configure({ useWebWorkers: false })</script>
  </head>
  <body>
    <p>Please wait...</p>
    <!--`, /* ZIP data */ `-->
    <script type=module>${minifyScript(MAIN_SCRIPT)}</script>
  </body>
</html>`];

export default template;