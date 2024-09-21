/// <reference types="vitest/config" />
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
      tests: '/src/tests',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      all: true,
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './tests/unit/coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/test/',
        'src/tests',
        'src/mocks',
        'src/validations/',
        'src/store/',
        'src/components/UI/Loaders',
        'src/components/UI/OnlineStatusMarker',
        'src/index.tsx',
        'src/App.tsx',
        '**/types.ts',
        '**/*.d.ts',
        '**/*.test.*',
        '**/*.spec.*',
      ],
    },
  },
});
