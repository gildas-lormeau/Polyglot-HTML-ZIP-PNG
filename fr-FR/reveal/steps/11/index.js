import { getZipData, getConsolidationData } from "./lib/utils-zip.js";
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

async function main() {
  const htmlPart0 = encodeText(HTML_PARTS[0]);
  const zipOffset = htmlPart0.length;
  const zipData = await getZipData(PROJECT_FOLDER_NAME, FILENAMES, zipOffset);
  const result = new Blob([
    htmlPart0,
    zipData,
    encodeText(HTML_PARTS[1]),
    // Generate and write consolidation data to the page
    getConsolidationData(zipData),
    encodeText(HTML_PARTS[2])
  ], { type: "text/html" });
  const linkElement = document.querySelector("a");
  linkElement.href = URL.createObjectURL(result);
}