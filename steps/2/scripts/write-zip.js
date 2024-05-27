#!/usr/bin/env -S deno run --allow-write --allow-read

import {
    getZipData
} from "./lib/utils-zip.js";
import {
    createFile
} from "./lib/utils-fs.js";

const zipData = await getZipData("./project");
const outputFile = await createFile("output.zip");
await outputFile.write(zipData);
outputFile.close();