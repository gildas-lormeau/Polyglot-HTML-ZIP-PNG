import { defineConfig } from "vite";
import httpsImports from "../lib/vite-plugin-https-imports-esm/index.js";

export default defineConfig(() => {
  return {
    base: "./",
    build: {
      target: "esnext",
      outDir: "../../build/code/03",
    },
    plugins: [
      httpsImports()
    ],
  };
});
