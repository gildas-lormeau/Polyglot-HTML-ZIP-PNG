import { minifyScript } from "./utils.js";

const ZIP_JS_SCRIPT = await (await fetch("assets/zip.min.js")).text();
const MAIN_SCRIPT = await (await fetch("assets/main.js")).text();

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