/** @type {import('eslint').Linter.Config} */
const config = {
  env: {
    browser: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  globals: {
    React: "writable",
  },
  rules: {
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};

module.exports = config;
