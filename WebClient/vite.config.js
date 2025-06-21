import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:7098",
        changeOrigin: true, // Important for virtual hosted sites
        secure: false, // Only for development with HTTPS backend
      },
    },
  },
});
