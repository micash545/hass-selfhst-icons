import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "hass-selfhst-icons.js",
      output: {
        dir: "dist",
        format: "esm",
      },
    },
    ssr: true,
    target: "esnext",
  },
  ssr: {
    target: "node",
    external: [],
    // bundle everything except for Node built-ins
    noExternal: /^(?!node:).*$/,
  },
  plugins: [],
});
