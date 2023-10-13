module.exports = {
  extends: "./babel.base.js",
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "12",
        },
        useBuiltIns: "usage",
        corejs: "3.33.0",
        modules: false,
      },
    ],
  ],
  plugins: [
    [
      "module-extension-resolver",
      {
        dstExtension: ".mjs",
      },
    ],
  ],
};
