module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    'no-mixed-spaces-and-tabs': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    "@typescript-eslint/ban-ts-ignore": 0,
    "linebreak-style": [0 ,"error", "windows"],
    "consistent-return":"off",
    "no-lonely-if":"off",
    "indent":"off",
    "no-param-reassign": "off",
    'import/no-unresolved': 0,
    "no-tabs": "off",
    "prettier/prettier":"off",
    "no-useless-escape":"off"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        mocha: true
      }
    }
  ]
};
