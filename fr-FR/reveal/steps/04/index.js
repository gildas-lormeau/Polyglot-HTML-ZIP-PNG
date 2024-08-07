import { getZipData } from "./lib/utils-zip.js";
import { encodeText } from "./lib/utils.js";
import HTML_PARTS from "./lib/html-template.js";

const PROJECT_FOLDER_NAME = "project";
const FILENAMES = [
  "index.html",
  "style.css",
  "properties.css",
  "script.js",
  "image.png",
  "background.png"
];

await main();

/**
 * Creates a zip file from the files in the input folder and the given 
 * filenames.
 */
async function main() {
  const htmlPart0 = encodeText(HTML_PARTS[0]);
  const zipOffset = htmlPart0.length;
  const zipData = await getZipData(PROJECT_FOLDER_NAME, FILENAMES, zipOffset);
  const result = new Blob([
    htmlPart0,
    zipData,
    encodeText(HTML_PARTS[1])
  ], { type: "text/html" });
  const linkElement = document.querySelector("a");
  linkElement.href = URL.createObjectURL(result);
}