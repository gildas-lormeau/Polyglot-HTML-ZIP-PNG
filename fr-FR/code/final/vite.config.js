import { defineConfig } from "vite";
import httpsImports from "vite-plugin-https-imports";
import { readFile } from "fs/promises";

async function getFetchSource() {
  const PROJECT_FILE_CONTENTS = new Map();
  PROJECT_FILE_CONTENTS.set("project/index.html", await readFileBase64("./project/index.html"));
  PROJECT_FILE_CONTENTS.set("project/style.css", await readFileBase64("./project/style.css"));
  PROJECT_FILE_CONTENTS.set("project/properties.css", await readFileBase64("./project/properties.css"));
  PROJECT_FILE_CONTENTS.set("project/script.js", await readFileBase64("./project/script.js"));
  PROJECT_FILE_CONTENTS.set("project/background.png", await readFileBase64("./project/background.png"));
  PROJECT_FILE_CONTENTS.set("assets/image.png", await readFileBase64("./assets/image.png"));
  PROJECT_FILE_CONTENTS.set("assets/main.js", await readFileBase64("./assets/main.js"));
  PROJECT_FILE_CONTENTS.set("assets/zip.min.js", await readFileBase64("./assets/zip.min.js"));
  const files = Array.from(PROJECT_FILE_CONTENTS.entries());
  return `(() => {
    const files = new Map(${JSON.stringify(files)});
    globalThis.fetch = path => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.open("GET", "data:;base64," + files.get(path));
      xhr.send();
      return new Promise(resolve => {
        xhr.onload = () => resolve(new Response(xhr.response));
      });
    }
  })();`;
}

async function readFileBase64(path) {
  const buffer = await readFile(new URL(path, import.meta.url));
  return buffer.toString("base64");
}

export default defineConfig(() => {
  return {
    base: "./",
    build: {
      target: "esnext",
      outDir: "../../build/code/final"
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
