import { getZipData } from "./lib/utils-zip.js";

const PROJECT_FOLDER_NAME = "project";
const FILENAMES = [
  "index.html",
  "style.css",
  "properties.css",
  "script.js",
  "image.png",
  "background.png"
];

const zipData = await getZipData(PROJECT_FOLDER_NAME, FILENAMES);
const linkElement = document.querySelector("a");
linkElement.href = URL.createObjectURL(new Blob([zipData]));