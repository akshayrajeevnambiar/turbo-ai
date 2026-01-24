import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "og.jpg", "robots.txt", "sitemap.xml"],
      manifest: {
        name: "Turbo AI — Architecting Intelligence",
        short_name: "Turbo AI",
        description:
          "We design and deploy intelligent systems for enterprises navigating complexity.",
        theme_color: "#0A0A0A",
        background_color: "#0A0A0A",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,woff2,txt,xml}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "google-fonts-stylesheets",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: mode === "development",
      },
    }),
  ],

  // Path alias for cleaner imports
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  // Base path for deployment
  base: "/",

  // Build configuration for production optimization
  build: {
    // Generate sourcemaps only in development
    sourcemap: mode === "development",

    // Asset hashing for cache busting
    rollupOptions: {
      output: {
        // Asset naming with hash for long-term caching
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".") || [];
          const extType = info[info.length - 1];

          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || "")) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/woff2?|eot|ttf|otf/i.test(extType || "")) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },

        // Chunk naming for code splitting
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",

        // Code splitting strategy
        manualChunks: {
          vendor: ["react", "react-dom"],
        },
      },
    },

    // Minification
    minify: "terser",

    // Asset size reporting
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },

  // Define environment variables for runtime
  define: {
    __DEV__: mode === "development",
    __PROD__: mode === "production",
  },

  // Server configuration for development
  server: {
    port: 5173,
    host: true,
    allowedHosts: ["f933e8531818.ngrok-free.app"],
  },

  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
  },
}));
