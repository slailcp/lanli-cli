// TODO待定
module.exports = {
  root: true,
  env: { node: true },
  extends: ['plugin:prettier/recommended'], //定义文件继承的子规范
  rules: {
      'no-debugger': 0,
      // allow es6
      'ecmaVersion': 6
  }
}