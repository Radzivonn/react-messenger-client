import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      API: '/src/API',
      assets: '/src/assets',
      components: '/src/components',
      hocs: '/src/hocs',
      hooks: '/src/hooks',
      modules: '/src/modules',
      pages: '/src/pages',
      router: '/src/router',
      store: '/src/store',
      styles: '/src/styles',
      types: '/src/types',
      validations: '/src/validations',
      mocks: '/src/mocks',
    },
  },
});
