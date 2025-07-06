// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  build: {
    format: "file",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), AstroPWA(), sitemap()],
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: true,
  },
  trailingSlash: "never",
  server: {
    port: 3000,
  },
});
