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
import {
    encodeText
} from "./utils.js";

const CARRIAGE_RETURN_CHAR_CODE = 13;
const LINE_FEED_CHAR_CODE = 10;

async function getZipData(inputFolder, offset) {
    const zipDataWriter = new Uint8ArrayWriter();
    await zipDataWriter.init();
    zipDataWriter.writable.size = offset;
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

function getExtraData(zipData) {
    const insertionsCRLF = [];
    const substitutionsLF = [];
    for (let index = 0; index < zipData.length; index++) {
        if (zipData[index] == CARRIAGE_RETURN_CHAR_CODE) {
            if (zipData[index + 1] == LINE_FEED_CHAR_CODE) {
                insertionsCRLF.push(index);
                index++;
            } else {
                substitutionsLF.push(index);
            }
        }
    }
    return encodeText(JSON.stringify([insertionsCRLF, substitutionsLF]));
}

export {
    getZipData,
    getExtraData
};