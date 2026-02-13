import { resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        play: resolve(__dirname, "play/index.html"),
        vogue: resolve(__dirname, "vogue/index.html"),
        sketches: resolve(__dirname, "sketches/index.html"),
        c4d: resolve(__dirname, "c4d/index.html"),
      },
    },
  },
});
