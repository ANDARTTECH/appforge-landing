import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { imagetools } from "vite-imagetools";
import compress from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react({ jsxRuntime: "automatic" }),

    // PWA (у вас уже был)
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",
      includeAssets: ["/favicon.svg", "/pwa-192.png", "/pwa-512.png"],
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "img",
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 7 },
            },
          },
        ],
      },
      manifest: {
        name: "AppForge",
        short_name: "AppForge",
        start_url: "/",
        display: "standalone",
        theme_color: "#4f46e5",
        background_color: "#111827",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),

    // AVIF / WebP генератор
    imagetools(),

    // Brotili + gzip
    compress({ algorithm: "brotliCompress" }),
    compress({ ext: ".gz" }),
  ],

  build: {
    sourcemap: false, // убираем карты из прод
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "framer";
            if (id.includes("lucide-react")) return "icons";
            return "vendor";
          }
        },
      },
    },
  },
});
