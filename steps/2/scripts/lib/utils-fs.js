// Options used when creating a new file.
const CREATE_NEW_FILE_OPTIONS = { createNew: true, write: true };

/**
 * Reads the contents of a file from the file system.
 *
 * @param {string} filename The name of the file to read.
 * @returns {Promise<Uint8Array>} The file contents.
 */
function readBinaryFile(filename) {
    return Deno.readFile(filename);
}

/**
 * Reads the directory given by the folder name and returns an async iterable
 * of directory entries.
 *
 * @param {string} folder The name of the directory to read.
 * @returns {AsyncIterable<DirEntry>} The directory contents.
 */
function readDirectory(folder) {
    return Deno.readDir(folder);
}

/**
 * Creates a new file with the given name. If the file already exists, it is
 * deleted first.
 * 
 * @param {string} filename The name of the file to create.
 * @returns {Promise<Deno.File>} The file handle.
 */
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
    readDirectory,
    createFile
};