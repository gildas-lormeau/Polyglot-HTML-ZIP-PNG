#!/usr/bin/env -S deno run --allow-write --allow-read

import {
    getZipData
} from "./lib/utils-zip.js";
import {
    createFile
} from "./lib/utils-fs.js";
import {
    encodeText
} from "./lib/utils.js";

import HTML_PARTS from "./lib/html-template.js";

await main("./project", "output.zip.html");

async function main(inputFolder, outputFilename) {
    const outputFile = await createFile(outputFilename);
    await writeFile(inputFolder, outputFile);
    outputFile.close();
}

async function writeFile(inputFolder, file) {
    const htmlPart0 = encodeText(HTML_PARTS[0]);
    const zipOffset = htmlPart0.length;
    const zipData = await getZipData(inputFolder, zipOffset);
    await file.write(htmlPart0);
    await file.write(zipData);
    await file.write(encodeText(HTML_PARTS[1]));
}