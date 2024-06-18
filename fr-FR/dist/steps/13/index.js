import { getZipData, getExtraData } from "./lib/utils-zip.js";
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
  "image.png",
  "background.png"
];

// Image data as Uint8Array
const IMAGE_DATA = new Uint8Array(
  await (await fetch("project/image.png")).arrayBuffer());
// Chunk keywords
const PNG_CHUNK_KEYWORD = "PNG";
const ZIP_CHUNK_KEYWORD = "ZIP";

await main();

async function main() {
  // Header data (signature + IHDR chunk)
  const headerData = getHeaderData(IMAGE_DATA);
  const htmlPart0 = encodeText(HTML_PARTS[0]);
  // First part of the HTML as a tEXt chunk
  const htmlPart0Chunk = createTextChunk(PNG_CHUNK_KEYWORD, htmlPart0);
  // Image data chunks
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
    // Header (signature + IHDR chunk), 
    headerData,
    // First part of the HTML as a tEXt chunk, 
    htmlPart0Chunk,
    // Image data chunks
    dataChunks,
    // Text chunk:
    // - second part of the HTML
    // - ZIP data
    // - third part of the HTML
    // - extra data
    // - fourth part of the HTML
    createTextChunk(ZIP_CHUNK_KEYWORD, mergeData(
      htmlPart1,
      zipData,
      encodeText(HTML_PARTS[2]),
      getExtraData(zipData),
      encodeText(HTML_PARTS[3])
    )),
    // Trailer chunk
    getTrailerChunk(IMAGE_DATA)
  ], { type: "text/html" });
  const linkElement = document.querySelector("a");
  linkElement.href = URL.createObjectURL(result);
}