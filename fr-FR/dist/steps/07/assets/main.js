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
/* Name of the script tag */
const SCRIPT_TAG_NAME = "script";

await main();

async function main() {
  const resources = await extractResources(globalThis.zip);
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
  return (await fetch("")).blob();
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
  /* Replace script tags with new script tags to execute scripts. */
  document.querySelectorAll(SCRIPT_TAG_NAME).forEach(script => {
    const newScript = document.createElement(SCRIPT_TAG_NAME);
    newScript.src = script.src;
    script.replaceWith(newScript);
  });
}

function getExtension(filename) {
  return filename.slice(filename.lastIndexOf("."));
}