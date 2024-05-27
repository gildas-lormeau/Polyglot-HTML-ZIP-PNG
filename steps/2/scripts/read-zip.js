#!/usr/bin/env -S deno run --allow-write --allow-read

import { ZipReader, BlobReader, BlobWriter, terminateWorkers } from "jsr:@zip-js/zip-js";

await extractResources("output.zip");
await terminateWorkers();

/**
 * Extract resources from the input zip file and log them.
 *
 * @param {string} filename The name of the zip file.
 * @returns {Promise<void>}
 */
async function extractResources(filename) {
    const zipData = await getZipData(filename);
    const zipReader = new ZipReader(new BlobReader(zipData));
    const entries = await zipReader.getEntries();
    for (const entry of entries) {
        const blob = await entry.getData(new BlobWriter());
        console.log("file:", entry.filename, "blob:", blob);
    }
    await zipReader.close();
}

/**
 * Returns the zip data for the input folder as a blob.
 * 
 * @param {string} filename The name of the zip file.
 * @returns {Promise<Blob>} The zip data.
 */
async function getZipData(filename) {
    const data = await Deno.readFile(filename);
    return new Blob([data]);
}