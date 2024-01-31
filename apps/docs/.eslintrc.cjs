module.exports = {
  extends: [require.resolve('@gooddads/eslint-config/library.js')],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json'
  },
}
