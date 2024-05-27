await main();

/**
 * Extract resources from the page read as a zip file and display them as links.
 */
async function main() {
    const resources = await extractResources(globalThis.zip);
    displayPage(resources);
}

/**
 * Extract resources from the page read as a zip file.
 * 
 * @param {*} zip The zip.js library.
 * @returns {Promise<{ [filename: string]: { filename: string, blobURI: string } }>} The resources.
 */
async function extractResources(zip) {
    const { ZipReader, BlobReader, BlobWriter } = zip;
    const resources = {};
    const zipReader = new ZipReader(new BlobReader(await getZipData()));
    const entries = await zipReader.getEntries();
    for (const entry of entries) {
        const { filename } = entry;
        const resource = {};
        /* Store the blob URI in the resource. */
        const blob = await entry.getData(new BlobWriter());
        resource.blobURI = URL.createObjectURL(blob);
        resources[filename] = resource;
    }
    await zipReader.close();
    return resources;
}

/**
 * Reads the page as a blob to read the zip data.
 * 
 * @returns {Promise<Blob>} The zip data.
 */
async function getZipData() {
    return (await fetch("")).blob();
}

/**
 * Display links to the resources.
 * 
 * @param {{ [filename: string]: { filename: string, blobURI: string } }} resources The resources.
 */
function displayPage(resources) {
    document.body.innerHTML = "";
    for (const { filename, blobURI } of Object.values(resources)) {
        document.body.innerHTML += `<a href="${blobURI}">${filename}</a><br>`;
    }
}