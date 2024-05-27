import {
    minifyScript
} from "./utils.js";
import {
    readTextFile
} from "./utils-fs.js";

const ZIP_JS_SCRIPT = await readTextFile("assets/zip.min.js");
const MAIN_SCRIPT = await readTextFile("assets/page-extraction.js");

const template = [`<!DOCTYPE html>
<html>
    <head>
        <meta charset=windows-1252>
        <title>Please wait...</title>
        <script>${ZIP_JS_SCRIPT}</script>
        <script>zip.configure({ useWebWorkers: false })</script>
    </head>
    <body>
        <p>Please wait...</p>
        <!--`, /* ZIP data */ `-->
        <script type=text/json>`, /* Extra data */ `</script>
        <script type=module>${minifyScript(MAIN_SCRIPT)}</script>
    </body>
</html>`];

export default template;