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
const TEXT_TYPES = {
    ".html": HTML_TYPE,
    ".css": "text/css",
    ".js": "text/javascript"
};
const DEFAULT_TYPE = "application/octet-stream";
const UTF8_CHARSET = "charset=utf-8";
const SCRIPT_TAG_NAME = "script";
const EXTRA_DATA_ELEMENT_SELECTOR = "script[type='text/json']";
const CARRIAGE_RETURN_CHAR_CODE = 13;
const LINE_FEED_CHAR_CODE = 10;
const CHAR_CODE_SUBSTITUTIONS = new Map([
    [65533, 0], [8364, 128], [8218, 130], [402, 131], [8222, 132], [8230, 133],
    [8224, 134], [8225, 135], [710, 136], [8240, 137], [352, 138], [8249, 139],
    [338, 140], [381, 142], [8216, 145], [8217, 146], [8220, 147], [8221, 148],
    [8226, 149], [8211, 150], [8212, 151], [732, 152], [8482, 153], [353, 154],
    [8250, 155], [339, 156], [382, 158], [376, 159]
]);
/* PNG signature */
const PNG_SIGNATURE = "\u2030PNG\n\x1A\n";

await main();

async function main() {
    /* Cleanup PNG data from the document */
    cleanupPNGData();
    const resources = await extractResources(globalThis.zip);
    resolveDependencies(resources);
    displayPage(resources);
}

/**
 * Cleans up PNG data from the document.
 */
function cleanupPNGData() {
    const { textContent } = document.body.firstChild;
    if (textContent.substring(0, PNG_SIGNATURE.length) === PNG_SIGNATURE) {
        document.body.firstChild.remove();
        document.body.lastChild.remove();
    }
}

async function extractResources(zip) {
    const { ZipReader, BlobReader, TextWriter, BlobWriter } = zip;
    const resources = {};
    const zipReader = new ZipReader(new BlobReader(getZipData()));
    const entries = await zipReader.getEntries();
    for (const entry of entries) {
        const { filename } = entry;
        const resource = {};
        const isText = Boolean(TEXT_TYPES[getExtension(filename)]);
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

function getZipData() {
    const bodyNodes = Array.from(document.body.childNodes);
    const zipDataNode = bodyNodes.findLast(
        node => node.nodeType === Node.COMMENT_NODE);
    const zipData = [];
    let { textContent } = zipDataNode;
    for (let index = 0; index < textContent.length; index++) {
        let charCode = textContent.charCodeAt(index);
        zipData.push(CHAR_CODE_SUBSTITUTIONS.get(charCode) ?? charCode);
    }
    const extraDataNode = document.querySelector(EXTRA_DATA_ELEMENT_SELECTOR);
    const extraData = JSON.parse(extraDataNode.textContent);
    const [insertionsCRLF, substitutionsLF] = extraData;
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
            const dependentText = resources[dependentPath].text;
            const dependentData = new TextEncoder().encode(dependentText);
            const dependantPathExtension = getExtension(dependentPath);
            const matchType = TEXT_TYPES[dependantPathExtension];
            let dependentDataType;
            if (matchType) {
                dependentDataType = `${matchType};${UTF8_CHARSET}`;
            } else {
                dependentDataType = DEFAULT_TYPE;
            }
            const dependentBlob = new Blob([dependentData],
                { type: dependentDataType });
            dependentURI = URL.createObjectURL(dependentBlob);
        }
        resource.text = resource.text.replaceAll(dependentPath, dependentURI);
    });
}

function displayPage(resources) {
    const indexPageSource = resources[INDEX_PATH].text;
    const indexPage = new DOMParser().parseFromString(indexPageSource, HTML_TYPE);
    document.documentElement.replaceWith(indexPage.documentElement);
    document.querySelectorAll(SCRIPT_TAG_NAME).forEach(script => {
        const newScript = document.createElement(SCRIPT_TAG_NAME);
        newScript.src = script.src;
        script.replaceWith(newScript);
    });
}

function getExtension(filename) {
    return filename.slice(filename.lastIndexOf("."));
}