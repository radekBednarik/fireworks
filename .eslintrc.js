module.exports = {
  env: {
    browser: true,
    es2021: true,
    "p5js/p5": true,
  },
  extends: ["eslint:recommended", "plugin:p5js/p5"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
  plugins: ["p5js"],
};
