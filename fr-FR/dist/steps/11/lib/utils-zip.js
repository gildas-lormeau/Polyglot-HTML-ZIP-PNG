import {
  ZipWriter,
  BlobReader,
  Uint8ArrayWriter
} from "https://unpkg.com/@zip.js/zip.js/index.js";
import {
  encodeText
} from "./utils.js";

// Carriage return character code
const CARRIAGE_RETURN_CHAR_CODE = 13;
// Line feed character code
const LINE_FEED_CHAR_CODE = 10;

async function getZipData(inputFolder, filenames, offset = 0) {
  const zipDataWriter = new Uint8ArrayWriter();
  await zipDataWriter.init();
  zipDataWriter.writable.size = offset;
  const zip = new ZipWriter(zipDataWriter);
  for (const filename of filenames) {
    const path = `${inputFolder}/${filename}`;
    const data = await (await fetch(path)).blob();
    await zip.add(filename, new BlobReader(data));
  };
  await zip.close();
  return zipDataWriter.getData();
}

/**
 * Returns the extra data for the zip data.
 * 
 * @param {Blob} zipData The zip data.
 * @returns {Uint8Array} The extra data consolidating the zip data.
 */
function getExtraData(zipData) {
  const insertionsCRLF = [];
  const substitutionsLF = [];
  for (let index = 0; index < zipData.length; index++) {
    if (zipData[index] === CARRIAGE_RETURN_CHAR_CODE) {
      if (zipData[index + 1] === LINE_FEED_CHAR_CODE) {
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