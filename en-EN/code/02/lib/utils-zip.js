import {
  ZipWriter,
  BlobReader,
  Uint8ArrayWriter
} from "https://unpkg.com/@zip.js/zip.js@2.7.49/index.js";

/**
 * Returns a zip file containing the files in the input folder with the given
 * filenames.
 * 
 * @param {string} inputFolder The input folder.
 * @param {string[]} filenames The filenames.
 * @returns {Promise<Uint8Array>} The zip file.
 */
async function getZipData(inputFolder, filenames) {
  const zipDataWriter = new Uint8ArrayWriter();
  const zip = new ZipWriter(zipDataWriter);
  for (const filename of filenames) {
    const path = `${inputFolder}/${filename}`;
    const data = await (await fetch(path)).blob();
    await zip.add(filename, new BlobReader(data));
  };
  await zip.close();
  return zipDataWriter.getData();
}

export {
  getZipData
};