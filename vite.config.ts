import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // <-- 1. Importamos la herramienta de rutas de Node

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // <-- 2. MAPEADO MÁGICO: Vincula el @ con la carpeta src
    },
  },
});
