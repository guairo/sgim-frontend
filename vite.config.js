/**
 * Configuracion de Vite para el proyecto SGIM.
 * Vite es el bundler y servidor de desarrollo seleccionado por su velocidad
 * y configuracion minima frente a Create React App.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // Abre el navegador automaticamente al iniciar
  },
});
