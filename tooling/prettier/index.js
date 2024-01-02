/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */

const plugins = [];

// strybook can't resolve prettier-plugin-tailwindcss
if (!process.env.STORYBOOK) {
  plugins.push("prettier-plugin-tailwindcss");
}

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
  plugins,
  // tailwindConfig: "../../tooling/tailwind",
};

module.exports = config;
