import {
    ZipWriter,
    Uint8ArrayReader,
    Uint8ArrayWriter,
    terminateWorkers
} from "jsr:@zip-js/zip-js";
import {
    readBinaryFile,
    readDirectory
} from "./utils-fs.js";

/**
 * Returns the zip data for the input folder.
 * 
 * 
 * @param {string} inputFolder 
 * @returns {Promise<Uint8Array>} The zip data.
 */
async function getZipData(inputFolder) {
    const zipDataWriter = new Uint8ArrayWriter();
    const zipWriter = new ZipWriter(zipDataWriter);
    const inputFiles = readDirectory(inputFolder);
    for await (const { name } of inputFiles) {
        const filename = `${inputFolder}/${name}`;
        const data = await readBinaryFile(filename);
        await zipWriter.add(name, new Uint8ArrayReader(data));
    };
    await zipWriter.close();
    await terminateWorkers();
    return zipDataWriter.getData();
}

export {
    getZipData
};