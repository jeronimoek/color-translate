module.exports = {
  extends: "./babel.base.js",
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "8",
        },
        useBuiltIns: "usage",
        corejs: "3.33.0",
        modules: "commonjs",
      },
    ],
  ],
};
