import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import emdash from "emdash/astro";

// 1. IMPORTACIÓN DEL PLUGIN
// Nota: Astro utiliza Vite, el cual resuelve archivos .ts automáticamente dentro del .mjs
import { readTimePlugin } from "./src/plugins/read-time.ts";

// 2. CONFIGURACIÓN DEL MOTOR ASTRO
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  
  // CORRECCIÓN 1: La configuración de imágenes global solo acepta dominios o un servicio de optimización.
  // Las propiedades visuales como layout o estilos deben ir en el componente <Image /> en tus archivos .astro.
  image: {
    // Ejemplo de configuración válida si necesitas dominios remotos:
    // domains: ["tus-imagenes.com"],
  },
  
  integrations: [
    react(),
    emdash({
      database: { binding: "DB", session: "auto" },
      storage: { binding: "MEDIA" },
      
      // 3. INYECCIÓN DEL PLUGIN PARA EMDASH
      plugins: [
        readTimePlugin({ wordsPerMinute: 220 }) 
      ]
    }),
  ],
  
  devToolbar: { enabled: false },
  
  // CORRECCIÓN 2: El nodo 'fonts' ha sido eliminado de la raíz.
  // Astro no posee una propiedad nativa 'fonts' en defineConfig().
});
