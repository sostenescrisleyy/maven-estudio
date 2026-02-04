import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { copyFileSync } from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Allow hosting in a subfolder (common on Hostinger).
  // Example: VITE_BASE="/meusite/" (must start and end with "/")
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE || "/";

  return ({
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      // Plugin para copiar .htaccess após o build
      {
        name: 'copy-htaccess',
        closeBundle() {
          try {
            copyFileSync(
              path.resolve(__dirname, '.htaccess'),
              path.resolve(__dirname, 'dist', '.htaccess')
            );
            console.log('✓ .htaccess copiado para dist/');
          } catch (error) {
            console.warn('⚠ Não foi possível copiar .htaccess:', error);
          }
        },
      },
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ['react', 'react-dom'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'animation-vendor': ['framer-motion', 'gsap', '@gsap/react'],
            'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-toast'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      target: 'es2015',
      minify: 'esbuild',
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
  })
});
