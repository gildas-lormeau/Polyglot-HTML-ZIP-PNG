const INDEX_PATH = "index.html";
const STYLE_PATH = "style.css";
const SCRIPT_PATH = "script.js";
const STYLE_PROPERTIES_PATH = "properties.css";
const BACKGROUND_IMAGE_PATH = "background.png";
const IMAGE_PATH = "image.png";
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
const SCRIPT_TAG_NAME = "script";
/* CSS Selector for the consolidation data element */
const EXTRA_DATA_ELEMENT_SELECTOR = "script[type='application/json']";
/* Carriage return character code */
const CARRIAGE_RETURN_CHAR_CODE = 13;
/* Line feed character code */
const LINE_FEED_CHAR_CODE = 10;
/* Character code substitutions for the zip data read as text */
const CHAR_CODE_SUBSTITUTIONS = new Map([
  [65533, 0], [8364, 128], [8218, 130], [402, 131], [8222, 132], [8230, 133],
  [8224, 134], [8225, 135], [710, 136], [8240, 137], [352, 138], [8249, 139],
  [338, 140], [381, 142], [8216, 145], [8217, 146], [8220, 147], [8221, 148],
  [8226, 149], [8211, 150], [8212, 151], [732, 152], [8482, 153], [353, 154],
  [8250, 155], [339, 156], [382, 158], [376, 159]
]);

await main();

async function main() {
  const resources = await extractResources(globalThis.zip);
  resolveDependencies(resources);
  displayPage(resources);
}

async function extractResources(zip) {
  const { ZipReader, BlobReader, TextWriter, BlobWriter } = zip;
  const resources = {};
  const zipReader = new ZipReader(new BlobReader(getZipData()));
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

/**
 * Get the zip data from the comment node in the document body.
 * 
 * @returns {Blob} The zip data.
 */
function getZipData() {
  /* Find the comment node that contains the zip data */
  const bodyNodes = Array.from(document.body.childNodes);
  const zipDataNode = bodyNodes.findLast(
    node => node.nodeType === Node.COMMENT_NODE);
  /* Convert the text content to an array of character codes */
  const zipData = [];
  let { textContent } = zipDataNode;
  for (let index = 0; index < textContent.length; index++) {
    let charCode = textContent.charCodeAt(index);
    zipData.push(CHAR_CODE_SUBSTITUTIONS.get(charCode) ?? charCode);
  }
  /* Find and parse the consolidation data node */
  const extraDataNode = document.querySelector(EXTRA_DATA_ELEMENT_SELECTOR);
  const extraData = JSON.parse(extraDataNode.textContent);
  const [insertionsCRLF, substitutionsLF] = extraData;
  /* Consolidate the zip data with the consolidation data */
  insertionsCRLF.forEach(index => zipData.splice(index, 1,
    CARRIAGE_RETURN_CHAR_CODE,
    LINE_FEED_CHAR_CODE));
  substitutionsLF.forEach(index => zipData[index] =
    CARRIAGE_RETURN_CHAR_CODE);
  return new Blob([new Uint8Array(zipData)]);
}

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
  document.querySelectorAll(SCRIPT_TAG_NAME).forEach(script => {
    const newScript = document.createElement(SCRIPT_TAG_NAME);
    newScript.src = script.src;
    script.replaceWith(newScript);
  });
}

function getExtension(filename) {
  return filename.slice(filename.lastIndexOf("."));
}