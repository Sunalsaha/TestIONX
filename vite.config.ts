import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { testionx } from "react-testionx/vite";

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && testionx()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
