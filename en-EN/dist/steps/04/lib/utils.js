/**
 * Encodes a text string into a Uint8Array.
 * 
 * @param {string} text The text string.
 * @returns {Uint8Array} The encoded text.
 */
function encodeText(text) {
  return new TextEncoder().encode(text);
}

/**
 * Minifies a script by removing whitespace characters.
 * 
 * @param {string} script 
 * @returns {string} The minified script.
 */
function minifyScript(script) {
  return script.replace(/[ \t\n]+/g, " ");
}

export {
  encodeText,
  minifyScript
};