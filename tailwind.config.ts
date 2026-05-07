import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondo principal
        fondo: "#0d0d0d",
        // Fondo de cards y paneles
        panel: "#1a1a1a",
        // Bordes
        borde: "#2a2a2a",
        // Acento principal (dorado/naranja)
        acento: {
          DEFAULT: "#d4831a",
          claro: "#e8972a",
          oscuro: "#b56b0f",
        },
        // Colores semánticos
        puntaje: "#e53935",   // rojo — mejor score
        info: "#42a5f5",      // azul — canales
        exito: "#4caf50",     // verde — live / publicado
        alerta: "#ff9800",    // naranja — pendiente
        // Texto
        texto: {
          principal: "#ffffff",
          secundario: "#888888",
          suave: "#555555",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "10px",
        pill: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
