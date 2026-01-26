import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
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
