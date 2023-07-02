module.exports = (api) => {
  api.cache(true);
  return {
    plugins: ['babel-plugin-macros'],
    presets: ['@babel/preset-typescript'],
  };
};
