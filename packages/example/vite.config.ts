import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { lingui } from '@lingui/vite-plugin';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    fs: {
      allow: ['../../'],
    },
  },
  plugins: [
    react({
      plugins: [['@lingui/swc-plugin', {}]],
    }),
    lingui(),
    svgr({
      svgrOptions: {
        icon: true,
        template: ({ jsx }, { tpl }) => tpl`
import React from 'react'
function IconComponent({ size, className, onClick, ...rest }, ref) {
  const prefix = 'svg-icon'
  const props = {
    tabIndex: onClick ? -1 : undefined,
    onClick,
    ...rest,
    ref,
    className: [prefix, size && \`\${prefix}-\${size}\`, className].join(' ')
  }
  return ${jsx}
}
export default React.forwardRef(IconComponent);
`,
      },
    }),
  ],
  optimizeDeps: {
    include: ['lodash-es', 'react', 'react-dom', 'react-dnd', 'react-dnd-html5-backend'],
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(process.cwd(), 'src')}/`,
      lodash: 'lodash-es',
      classnames: 'clsx',
      'lodash.debounce': 'lodash-es/debounce',
      'lodash.throttle': 'lodash-es/throttle',
    },
    dedupe: ['@xuan/components'],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
