import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add these lines to allow all .js files to contain JSX
  esbuild: {
    loader: { '.js': 'jsx' },// OR "jsx"
    include: [
      // Add these lines to allow all .js files to contain JSX
      "src/**/*.js",
      "node_modules/**/*.js",
    ],
  },
});
