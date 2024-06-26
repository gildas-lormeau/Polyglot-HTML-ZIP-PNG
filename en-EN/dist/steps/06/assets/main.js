const INDEX_PATH = "index.html";
/* Stylesheet path in the zip file */
const STYLE_PATH = "style.css";
/* Script path in the zip file */
const SCRIPT_PATH = "script.js";
/* Properties stylesheet path in the zip file */
const STYLE_PROPERTIES_PATH = "properties.css";
/* Background image path in the zip file */
const BACKGROUND_IMAGE_PATH = "background.png";
/* Image path in the zip file */
const IMAGE_PATH = "image.png";
/* Dependencies between resources */
const DEPENDENCIES = [
  [STYLE_PATH, STYLE_PROPERTIES_PATH],
  [STYLE_PATH, BACKGROUND_IMAGE_PATH],
  [INDEX_PATH, STYLE_PATH],
  [INDEX_PATH, SCRIPT_PATH],
  [INDEX_PATH, IMAGE_PATH]
];

const HTML_TYPE = "text/html";
const TEXT_EXTENSIONS = [
  ".html",
  ".css",
  ".js"
];

await main();

/**
 * Extract resources from the page read as a zip file and display the index 
 * page with the external resources.
 */
async function main() {
  const resources = await extractResources(globalThis.zip);
  /* Resolve dependencies between resources */
  resolveDependencies(resources);
  displayPage(resources);
}

async function extractResources(zip) {
  const { ZipReader, BlobReader, TextWriter, BlobWriter } = zip;
  const resources = {};
  const zipReader = new ZipReader(new BlobReader(await getZipData()));
  const entries = await zipReader.getEntries();
  for (const entry of entries) {
    const { filename } = entry;
    const resource = {};
    const isText = TEXT_EXTENSIONS.includes(getExtension(filename));
    if (isText) {
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
 * Resolve dependencies between resources.
 * 
 * @param {{ [filename: string]: { text: string, blobURI?: string } }} resources
 *  The resources.
 * @returns {void}
 */
function resolveDependencies(resources) {
  DEPENDENCIES.forEach(([path, dependentPath]) => {
    const resource = resources[path];
    const dependentResource = resources[dependentPath];
    let dependentURI;
    if (dependentResource.blobURI) {
      dependentURI = dependentResource.blobURI;
    } else {
      const dependentData = new TextEncoder().encode(dependentResource.text);
      const dependentBlob = new Blob([dependentData]);
      dependentURI = URL.createObjectURL(dependentBlob);
    }
    resource.text = resource.text.replaceAll(dependentPath, dependentURI);
  });
}

function displayPage(resources) {
  const indexPageText = resources[INDEX_PATH].text;
  const indexDoc = new DOMParser().parseFromString(indexPageText, HTML_TYPE);
  document.documentElement.replaceWith(indexDoc.documentElement);
}

function getExtension(filename) {
  return filename.slice(filename.lastIndexOf("."));
}