export default {
  locales: ['zh-cn', 'en'],
  sourceLocale: 'zh-cn',
  compileNamespace: 'ts',
  catalogs: [
    {
      path: 'src/locales/{locale}/messages',
      include: ['src/**/*.{ts,tsx}', 'node_modules/**/src/**/*.{ts,tsx}'],
      exclude: ['src/locales/**/*'],
    },
  ],
  format: 'minimal',
};
