/* Index page path in the zip file */
const INDEX_PATH = "index.html";
/* Text file  MIME type */
const HTML_TYPE = "text/html";
/* Text file extensions */
const TEXT_EXTENSIONS = [
  ".html",
  ".css",
  ".js"
];

await main();

/**
 * Extract resources from the page read as a zip file and display the index 
 * page.
 */
async function main() {
  const resources = await extractResources(globalThis.zip);
  displayPage(resources);
}

async function extractResources(zip) {
  /* Import TextWriter to read text files. */
  const { ZipReader, BlobReader, TextWriter, BlobWriter } = zip;
  const resources = {};
  const zipReader = new ZipReader(new BlobReader(await getZipData()));
  const entries = await zipReader.getEntries();
  for (const entry of entries) {
    const { filename } = entry;
    const resource = {};
    /* Check if the file is a text file. */
    const isText = TEXT_EXTENSIONS.includes(getExtension(filename));
    if (isText) {
      /* Store the text content in the resource. */
      resource.text = await entry.getData(new TextWriter());
    } else {
      const blob = await entry.getData(new BlobWriter());
      resource.blobURI = URL.createObjectURL(blob);
    }
    resources[filename] = resource;
  }
  await zipReader.close();
  return resources;
}

async function getZipData() {
  return (await globalThis.fetch("")).blob();
}

/**
 * Display the index page.
 * 
 * @param {{ [filename: string]: { blobURI: string, text: string } }} resources
 *  The resources.
 * @returns {void}
 */
function displayPage(resources) {
  const indexPageText = resources[INDEX_PATH].text;
  const indexDoc = new DOMParser().parseFromString(indexPageText, HTML_TYPE);
  document.documentElement.replaceWith(indexDoc.documentElement);
}

/**
 * Get the extension of a filename.
 * 
 * @param {string} filename The filename.
 * @returns {string} The extension.
 */
function getExtension(filename) {
  return filename.slice(filename.lastIndexOf("."));
}