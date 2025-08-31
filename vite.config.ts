import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const cacheDir = process.env.VITE_CACHE_DIR || ".vite-cache"; // avoid writing under node_modules to prevent EACCES
  const base = process.env.VITE_BASE_PATH || "/"; // for GitHub Pages, set to "/<repo>/"

  return {
    base,
    server: {
      host: "::",
      port: 8080,
      proxy: {
        // Development-time proxy to avoid CORS for the Prime Status API
        "/api/prime": {
          target: "https://yukieevee-warframe.koyeb.app",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/api/drop": {
          target: "https://yukieevee-warframe.koyeb.app",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    cacheDir,
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
