const MAIN_SCRIPT = await (await fetch("assets/page-extraction.js")).text();

const template = [`<!DOCTYPE html>
<html>
  <head>
    <meta charset=utf-8>
    <title>HEX View (UTF-8)</title>
    <style>
      body {
        white-space: pre-wrap;
        font-family: monospace;
      }
      .yellow {
        background-color: yellow;
      }
      .orange {
        background-color: orange;
      }
    </style>
  </head>
  <body>
    <p>Please wait...</p>
    <!--`, /* ZIP data */ `-->
    <script type=module>${MAIN_SCRIPT}</script>
  </body>
</html>`];

export default template;