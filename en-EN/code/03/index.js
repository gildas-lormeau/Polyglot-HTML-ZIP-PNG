import {
  ZipReader,
  BlobReader,
  BlobWriter
} from "https://unpkg.com/@zip.js/zip.js@2.7.52/index.js";

const fileInput = document.querySelector("input");
const mainElement = document.querySelector("main");

fileInput.onchange = async () => {
  const file = fileInput.files[0];
  if (file) {
    await extractResources(file);
  }
};

/**
 * Extract resources from the input zip file and display them as links in the 
 * main element.
 *
 * @param {Blob} zipData The input zip file.
 */
async function extractResources(zipData) {
  const zipReader = new ZipReader(new BlobReader(zipData));
  const entries = await zipReader.getEntries();
  for (const entry of entries) {
    const blob = await entry.getData(new BlobWriter());
    const linkElement = document.createElement("a");
    linkElement.href = URL.createObjectURL(blob);
    linkElement.textContent = linkElement.download = entry.filename;
    mainElement.appendChild(linkElement);
  }
  await zipReader.close();
}