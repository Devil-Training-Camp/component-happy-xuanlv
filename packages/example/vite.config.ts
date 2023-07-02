import { defineConfig } from 'vite';
import path from 'path';
import viteReact from '@vitejs/plugin-react';
// @ts-ignore
import LessPluginImportNodeModules from 'less-plugin-import-node-modules';

export default defineConfig({
  server: {
    fs: {
      allow: ['../../'],
    },
  },
  plugins: [
    viteReact(),
  ],
  optimizeDeps: {
    include: [
      'clsx',
      'styled-components',
      'lodash-es',
      'react',
      'react-dom',
    ],
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(process.cwd(), 'src')}/`,
      lodash: 'lodash-es',
      'lodash.debounce': 'lodash-es/debounce',
      'lodash.throttle': 'lodash-es/throttle',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        plugins: [new LessPluginImportNodeModules()],
        javascriptEnabled: true,
      },
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
