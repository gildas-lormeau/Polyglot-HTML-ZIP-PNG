import {
  ZipWriter,
  BlobReader,
  Uint8ArrayWriter
} from "https://unpkg.com/@zip.js/zip.js@2.7.52/index.js";

async function getZipData(inputFolder, filenames, offset = 0) {
  const zipDataWriter = new Uint8ArrayWriter();
  await zipDataWriter.init();
  // Set the offset of the first entry
  const zip = new ZipWriter(zipDataWriter, { offset });
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