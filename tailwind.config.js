/**
 * Configuracion de Tailwind CSS para el proyecto SGIM.
 * Define la paleta institucional y los archivos que seran escaneados
 * para generar las clases CSS necesarias.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta institucional inspirada en los colores oficiales de las
        // alcaldias de Colombia (azul institucional).
        sgim: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2e74b5',
          600: '#1f5a9c',
          700: '#1f3864',
          900: '#0f1f3d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
