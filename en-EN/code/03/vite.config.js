import { defineConfig } from "vite";
import httpsImports from "vite-plugin-https-imports";

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
