import {
  encodeText
} from "./utils.js";

// Length of the PNG signature
const SIGNATURE_LENGTH = 8;
// Length of the IHDR chunk
const IHDR_CHUNK_LENGTH = 25;
// Length of the IEND chunk
const IEND_CHUNK_LENGTH = 12;
// Length of the keyword in a text chunk
const KEYWORD_LENGTH = 3;
// Text type chunk
const TEXT_TYPE_CHUNK = encodeText("tEXt");
// CRC32 table
const CRC32_TABLE = new Uint32Array(256).map((_, indexTable) => {
  let result = indexTable;
  for (let indexBits = 0; indexBits < 8; indexBits++) {
    result = result & 1 ? 0xEDB88320 ^ (result >>> 1) : result >>> 1;
  }
  return result;
});

/**
 * Returns the header chunk of the PNG image.
 * 
 * @param {Uint8Array} imageData
 * @returns {Uint8Array} The header chunk.
 */
function getHeaderData(imageData) {
  const endOffset = SIGNATURE_LENGTH + IHDR_CHUNK_LENGTH;
  return imageData.slice(0, endOffset);
}

/**
 * Returns the data chunks of the PNG image.
 * 
 * @param {Uint8Array} imageData
 * @returns {Uint8Array} The data chunks.
 */
function getDataChunks(imageData) {
  const startOffset = SIGNATURE_LENGTH + IHDR_CHUNK_LENGTH;
  const endOffset = imageData.length - IEND_CHUNK_LENGTH;
  return imageData.slice(startOffset, endOffset);
}

/**
 * Returns the trailer chunk of the PNG image.
 * 
 * @param {Uint8Array} imageData
 * @returns {Uint8Array} The trailer chunk.
 */
function getTrailerChunk(imageData) {
  const startOffset = imageData.length - IEND_CHUNK_LENGTH;
  return imageData.slice(startOffset);
}

/**
 * Creates a text chunk with the specified keyword and data.
 * 
 * @param {string} keyword The keyword.
 * @param {Uint8Array} data The data.
 * @returns {Uint8Array} The text chunk.
 */
function createTextChunk(keyword, data) {
  const payloadData = new Uint8Array([
    ...encodeText(keyword),
    0,
    ...data
  ]);
  const chunkData = new Uint8Array([
    ...TEXT_TYPE_CHUNK,
    ...payloadData
  ]);
  return new Uint8Array([
    ...getUint32Array(payloadData.length),
    ...chunkData,
    ...getCRC32(chunkData)
  ]);
}

/**
 * Returns the offset of the data in a text chunk.
 * 
 * @returns {number} The offset of the data.
 */
function getChunkDataOffset() {
  return KEYWORD_LENGTH + 1 + TEXT_TYPE_CHUNK.length + 4;
}

export {
  createTextChunk,
  getHeaderData,
  getDataChunks,
  getTrailerChunk,
  getChunkDataOffset
};

/**
 * Returns the CRC32 checksum of the data.
 * 
 * @param {Uint8Array} data The data.
 * @returns {Uint8Array} The CRC32 checksum.
 */
function getCRC32(data) {
  const result = new Uint8Array(4);
  let crc = -1;
  for (let indexData = 0; indexData < data.length; indexData++) {
    crc = (crc >>> 8) ^ CRC32_TABLE[(crc ^ data[indexData]) & 255];
  }
  crc ^= -1;
  setUint32Array(result, crc);
  return result;
}

/**
 * Returns a Uint8Array instance with the specified value.
 *
 * @param {number} value The value.
 * @returns {Uint8Array} The Uint8Array instance.
 */
function getUint32Array(value) {
  const result = new Uint8Array(4);
  setUint32Array(result, value);
  return result;
}

/**
 * Sets the Uint8Array instance with the specified value.
 * 
 * @param {Uint8Array} data The data.
 * @param {number} value The value.
 */
function setUint32Array(data, value) {
  data[0] = value >> 24;
  data[1] = value >> 16;
  data[2] = value >> 8;
  data[3] = value;
}