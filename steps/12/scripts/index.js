#!/usr/bin/env -S deno run --allow-write --allow-read

import {
    getZipData,
    getExtraData
} from "./lib/utils-zip.js";
import {
    createTextChunk,
    getHeaderData,
    getDataChunks,
    getTrailerChunk,
    getChunkDataOffset
} from "./lib/utils-png.js";
import {
    readBinaryFile,
    createFile
} from "./lib/utils-fs.js";
import {
    encodeText,
    mergeData
} from "./lib/utils.js";

import HTML_PARTS from "./lib/html-template.js";

// Image data as Uint8Array
const IMAGE_DATA = await readBinaryFile("project/image.png");
// Chunk keywords
const PNG_CHUNK_KEYWORD = "PNG";
const ZIP_CHUNK_KEYWORD = "ZIP";

await main("./project", "output.zip.html");

async function main(inputFolder, outputFilename) {
    const outputFile = await createFile(outputFilename);
    await writeFile(inputFolder, outputFile);
    outputFile.close();
}

async function writeFile(inputFolder, file) {
    const headerChunk = getHeaderData(IMAGE_DATA);
    const htmlPart0 = encodeText(HTML_PARTS[0]);
    const htmlPart0Chunk = createTextChunk(PNG_CHUNK_KEYWORD, htmlPart0);
    const dataChunks = getDataChunks(IMAGE_DATA);
    const htmlPart1 = encodeText(HTML_PARTS[1]);
    // Store the offset where the ZIP data will be written
    const zipOffset =
        headerChunk.length +
        htmlPart0Chunk.length +
        dataChunks.length +
        htmlPart1.length +
        getChunkDataOffset();
    // Write: 
    // - the header chunk (signature + IHDR chunk), 
    // - the first part of the HTML as a tEXt chunk, 
    // - the image data chunks
    await file.write(mergeData(
        headerChunk,
        htmlPart0Chunk,
        dataChunks
    ));
    const zipData = await getZipData(inputFolder, zipOffset);
    // Write as a text chunk:
    // - the second part of the HTML, 
    // - the ZIP data, 
    // - the third part of the HTML,
    // - the extra data, 
    // - the fourth part of the HTML. 
    await file.write(createTextChunk(ZIP_CHUNK_KEYWORD, mergeData(
        htmlPart1,
        zipData,
        encodeText(HTML_PARTS[2]),
        getExtraData(zipData),
        encodeText(HTML_PARTS[3])
    )));
    // Write the PNG trailer chunk
    await file.write(getTrailerChunk(IMAGE_DATA));
}