import {
  encodeText
} from "./utils.js";

const SIGNATURE_LENGTH = 8;
const IHDR_CHUNK_LENGTH = 25;
const IEND_CHUNK_LENGTH = 12;
const KEYWORD_LENGTH = 3;
// Length of the chunk length field
const CHUNK_LENGTH = 4;
// Type for bKGD chunk
const BKGD_TYPE_CHUNK = encodeText("bKGD");
// Type for IDAT chunk
const IDAT_TYPE_CHUNK = encodeText("IDAT");
const CRC32_TABLE = new Uint32Array(256).map((_, indexTable) => {
  let result = indexTable;
  for (let indexBits = 0; indexBits < 8; indexBits++) {
    result = result & 1 ? 0xEDB88320 ^ (result >>> 1) : result >>> 1;
  }
  return result;
});

function getHeaderData(imageData) {
  const endOffset = SIGNATURE_LENGTH + IHDR_CHUNK_LENGTH;
  return imageData.slice(0, endOffset);
}

function getDataChunks(imageData) {
  const startOffset = SIGNATURE_LENGTH + IHDR_CHUNK_LENGTH;
  const endOffset = imageData.length - IEND_CHUNK_LENGTH;
  return imageData.slice(startOffset, endOffset);
}

function getTrailerChunk(imageData) {
  const startOffset = imageData.length - IEND_CHUNK_LENGTH;
  return imageData.slice(startOffset);
}

function createChunk(type, keyword, data) {
  const payloadData = new Uint8Array([
    ...encodeText(keyword),
    0,
    ...data
  ]);
  const chunkData = new Uint8Array([
    ...type,
    ...payloadData
  ]);
  return new Uint8Array([
    ...getUint32Array(payloadData.length),
    ...chunkData,
    ...getCRC32(chunkData)
  ]);
}

function getChunkDataOffset() {
  return KEYWORD_LENGTH + 1 + CHUNK_LENGTH + 4;
}

export {
  BKGD_TYPE_CHUNK,
  IDAT_TYPE_CHUNK,
  createChunk,
  getHeaderData,
  getDataChunks,
  getTrailerChunk,
  getChunkDataOffset
};

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

function getUint32Array(value) {
  const result = new Uint8Array(4);
  setUint32Array(result, value);
  return result;
}

function setUint32Array(data, value) {
  data[0] = value >> 24;
  data[1] = value >> 16;
  data[2] = value >> 8;
  data[3] = value;
}