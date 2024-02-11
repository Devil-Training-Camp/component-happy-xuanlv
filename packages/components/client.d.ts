/// <reference types="vite-plugin-svgr/client" />

type CSSModuleClasses = Readonly<Record<string, string>>;

declare module '*.module.less' {
  const classes: CSSModuleClasses;
  export default classes;
}
