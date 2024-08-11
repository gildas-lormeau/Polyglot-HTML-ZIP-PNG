import { defineConfig } from "vite";
import httpsImports from "vite-plugin-https-imports";
import { readFile } from "fs/promises";

async function getFetchSource() {
  const PROJECT_FILE_CONTENTS = new Map();
  PROJECT_FILE_CONTENTS.set("project/index.html", Array.from(await readFile(new URL("./project/index.html", import.meta.url))));
  PROJECT_FILE_CONTENTS.set("project/style.css", Array.from(await readFile(new URL("./project/style.css", import.meta.url))));
  PROJECT_FILE_CONTENTS.set("project/properties.css", Array.from(await readFile(new URL("./project/properties.css", import.meta.url))));
  PROJECT_FILE_CONTENTS.set("project/script.js", Array.from(await readFile(new URL("./project/script.js", import.meta.url))));
  PROJECT_FILE_CONTENTS.set("project/image.png", Array.from(await readFile(new URL("./project/image.png", import.meta.url))));
  PROJECT_FILE_CONTENTS.set("project/background.png", Array.from(await readFile(new URL("./project/background.png", import.meta.url))));
  PROJECT_FILE_CONTENTS.set("assets/main.js", Array.from(await readFile(new URL("./assets/main.js", import.meta.url))));
  PROJECT_FILE_CONTENTS.set("assets/zip.min.js", Array.from(await readFile(new URL("./assets/zip.min.js", import.meta.url))));
  const files = Array.from(PROJECT_FILE_CONTENTS.entries());
  return `(() => {
    const files = new Map(${JSON.stringify(files)});
    globalThis.fetch = path => new Response(new Uint8Array(files.get(path))); 
  })();`;
}

export default defineConfig(() => {
  return {
    base: "./",
    build: {
      target: "esnext",
      outDir: "../../build/code/13",
    },
    plugins: [
      httpsImports(),
      {
        name: "mock-fetch-plugin",
        async transform(code, id) {
          if (id.endsWith("/index.js")) {
            code = await getFetchSource() + code;
          }
          return code;
        }
      },
    ],
  };
});
