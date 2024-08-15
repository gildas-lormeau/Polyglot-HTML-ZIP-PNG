import {
  ZipWriter,
  BlobReader,
  Uint8ArrayWriter
} from "https://unpkg.com/@zip.js/zip.js@2.7.48/index.js";

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

export {
  getZipData
};