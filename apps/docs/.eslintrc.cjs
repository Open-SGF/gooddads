module.exports = {
  extends: [require.resolve('@repo/eslint-config/library.js')],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
}
