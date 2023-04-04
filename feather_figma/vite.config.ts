import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  root: './ui-src',
  plugins: [reactRefresh(), viteSingleFile()],
  build: {
    target: 'esnext',
    assetsInlineLimit: 100000000,
    chunkSizeWarningLimit: 100000000,
    cssCodeSplit: false,
    outDir: '../dist',
    rollupOptions: {
      inlineDynamicImports: false,
      input: {
        main: resolve(__dirname, 'ui-src/'+process.env.UI_TARGET),
      },
    },
  },
})
