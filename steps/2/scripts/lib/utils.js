/**
 * Encodes a text string into a Uint8Array.
 * 
 * @param {string} text 
 * @returns {Uint8Array} The encoded text.
 */
function encodeText(text) {
    return new TextEncoder().encode(text);
}

export {
    encodeText
};