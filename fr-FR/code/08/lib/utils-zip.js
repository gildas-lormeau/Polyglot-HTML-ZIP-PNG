import {
  ZipWriter,
  BlobReader,
  BlobWriter
} from "https://unpkg.com/@zip.js/zip.js@2.7.52/index.js";

async function getZipData(inputFolder, filenames, offset = 0) {
  const zipDataWriter = new BlobWriter();
  await zipDataWriter.init();
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