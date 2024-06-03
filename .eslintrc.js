module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  rules: {
    "vue/multi-word-component-names": "off",
  },
  overrides: [
    {
      files: ["*.vue"],
      rules: {
        "vue/multi-word-component-names": "off",
      },
    },
  ],
};
