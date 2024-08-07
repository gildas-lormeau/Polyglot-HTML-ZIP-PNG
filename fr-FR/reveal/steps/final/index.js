import { getZipData, getConsolidationData } from "./lib/utils-zip.js";
import { encodeText, mergeData } from "./lib/utils.js";
import {
  createTextChunk,
  getHeaderData,
  getDataChunks,
  getTrailerChunk,
  getChunkDataOffset
} from "./lib/utils-png.js";
import HTML_PARTS from "./lib/html-template.js";

const PROJECT_FOLDER_NAME = "project";
const FILENAMES = [
  "index.html",
  "style.css",
  "properties.css",
  "script.js",
  "background.png"
];

const IMAGE_DATA = new Uint8Array(
  await (await fetch("assets/image.png")).arrayBuffer());
const PNG_CHUNK_KEYWORD = "PNG";
const ZIP_CHUNK_KEYWORD = "ZIP";

await main();

async function main() {
  const headerData = getHeaderData(IMAGE_DATA);
  const htmlPart0 = encodeText(HTML_PARTS[0]);
  const htmlPart0Chunk = createTextChunk(PNG_CHUNK_KEYWORD, htmlPart0);
  const dataChunks = getDataChunks(IMAGE_DATA);
  const htmlPart1 = encodeText(HTML_PARTS[1]);
  const zipOffset =
    headerData.length +
    htmlPart0Chunk.length +
    dataChunks.length +
    htmlPart1.length +
    getChunkDataOffset();
  const zipData = await getZipData(PROJECT_FOLDER_NAME, FILENAMES, zipOffset);
  const result = new Blob([
    headerData,
    htmlPart0Chunk,
    dataChunks,
    createTextChunk(ZIP_CHUNK_KEYWORD, mergeData(
      htmlPart1,
      zipData,
      encodeText(HTML_PARTS[2]),
      getConsolidationData(zipData),
      encodeText(HTML_PARTS[3])
    )),
    getTrailerChunk(IMAGE_DATA)
  ], { type: "text/html" });
  const linkElement = document.querySelector("a");
  linkElement.href = URL.createObjectURL(result);
}