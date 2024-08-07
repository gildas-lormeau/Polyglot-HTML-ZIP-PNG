import { minifyScript } from "./utils.js";

const ZIP_JS_SCRIPT = await (await fetch("assets/zip.min.js")).text();
const MAIN_SCRIPT = await (await fetch("assets/main.js")).text();

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
    <script type=text/json>`, /* Consolidation data */ `</script>
    <script type=module>${minifyScript(MAIN_SCRIPT)}</script>
  </body>
</html>`];

export default template;