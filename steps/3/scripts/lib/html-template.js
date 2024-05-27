import {
    minifyScript
} from "./utils.js";
import {
    readTextFile
} from "./utils-fs.js";

// The zip.js script
const ZIP_JS_SCRIPT = await readTextFile("assets/zip.min.js");
// The main script for the page extraction
const MAIN_SCRIPT = await readTextFile("assets/page-extraction.js");

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