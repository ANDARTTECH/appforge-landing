// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import Sitemap from "vite-plugin-sitemap";          // ← ① новый импорт
import path from "node:path";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
    }),

    // ── PWA ──────────────────────────────────────────────────────────────
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",
      includeAssets: ["/favicon.svg", "/pwa-192.png", "/pwa-512.png"],
      manifest: {
        name: "AppForge",
        short_name: "AppForge",
        description: "Мы превращаем идеи в мобильные приложения",
        start_url: "/",
        display: "standalone",
        background_color: "#111827",
        theme_color: "#4f46e5",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
        ],
      },
    }),

    // ── Sitemap ──────────────────────────────────────────────────────────
    Sitemap({
      /** базовый публичный URL вашего сайта */
      hostname: "https://andart.tech",

      /** маршруты SPA, которые не видны как отдельные HTML-файлы */
      dynamicRoutes: [
        "/services",
        "/portfolio",
        "/contact"
      ],

      /** если нужен robots.txt */
      // generateRobotsTxt: true,
    }),
  ],

  // ── Псевдонимы ─────────────────────────────────────────────────────────
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  // ── Dev-сервер ─────────────────────────────────────────────────────────
  server: {
    port: 5173,
    open: true,
  },

  // ── Build-output ───────────────────────────────────────────────────────
  build: {
    outDir: "dist",
    sourcemap: true,
    emptyOutDir: true,
  },
});
