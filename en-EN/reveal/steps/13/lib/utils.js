function encodeText(text) {
  return new TextEncoder().encode(text);
}

function minifyScript(script) {
  return script.replace(/[ \t\n]+/g, " ");
}

/**
 * Merges multiple Uint8Array instances into a single one.
 * 
 * @param  {...Uint8Array} data
 * @returns {Uint8Array} The merged data.
 */
function mergeData(...data) {
  const totalLength = data.reduce((total, array) => total + array.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  data.forEach(array => {
    result.set(array, offset);
    offset += array.length;
  });
  return result;
}

export {
  encodeText,
  minifyScript,
  mergeData
};