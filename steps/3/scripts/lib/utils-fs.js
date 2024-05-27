const CREATE_NEW_FILE_OPTIONS = { createNew: true, write: true };

function readBinaryFile(filename) {
    return Deno.readFile(filename);
}

function readDirectory(folder) {
    return Deno.readDir(folder);
}

/**
 * Reads the contents of a text file from the file system.
 * 
 * @param {string} filename 
 * @returns {Promise<string>} The file contents.
 */
function readTextFile(filename) {
    return Deno.readTextFile(filename);
}

async function createFile(filename) {
    try {
        await Deno.remove(filename);
    } catch (error) {
        if (error.name !== "NotFound") {
            throw error;
        }
    }
    return Deno.open(filename, CREATE_NEW_FILE_OPTIONS);
}

export {
    readBinaryFile,
    readTextFile,
    readDirectory,
    createFile
};