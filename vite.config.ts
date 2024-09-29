import generouted from "@generouted/react-router/plugin";
import Crypto from "crypto";
import path from "path";
import { defineConfig } from "vite";
import { ViteMinifyPlugin } from "vite-plugin-minify";
import viteWpReact from "./src/vite/wp-react";
function randomString(size = 6) {
  return Crypto.randomBytes(size).toString("hex").slice(0, size);
}
const rand = randomString();
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    modulePreload: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[hash].${rand}.js`,
        chunkFileNames: `assets/[hash].${rand}.js`,
        assetFileNames: `assets/[hash].${rand}.[ext]`,
      },
    },
  },
  plugins: [
    generouted(),
    viteWpReact({
      input: { main: "src/index.tsx" },
      outDir: "build",
      constants: [
        "SLUG",
        "ENGINE_URL",
        "PLUGIN_DOWNLOAD_URL",
        "PLUGIN_INFO_URL",
        "ADMIN_MENU_TITLE",
        "ACTIVATION_KEY",
        "ADMIN_MENU_TITLE",
        "ADMIN_PAGE_ID",
        "ADMIN_PAGE_TITLE",
        "SETTING_KEY",
      ],
    }),
    ViteMinifyPlugin(),
  ],
});
