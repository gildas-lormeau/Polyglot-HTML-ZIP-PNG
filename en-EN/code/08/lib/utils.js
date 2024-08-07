function encodeText(text) {
  return new TextEncoder().encode(text);
}

export {
  encodeText
};