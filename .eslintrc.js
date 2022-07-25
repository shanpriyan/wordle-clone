const aliases = require('./jsconfig.json').compilerOptions;

function getImportAliases() {
  const { baseUrl, paths } = aliases;
  return Object.keys(paths).reduce(
    (acc, aliasPath) => ({
      ...acc,
      [aliasPath]: `${baseUrl}/${paths[aliasPath]}`,
    }),
    {},
  );
}

module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@next/next/recommended',
  ],
  rules: {
    'no-unused-vars': 1,
    'no-undef': 2,
    'import/order': 2,
    'no-redeclare': 2,
    'no-use-before-define': 2,
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: getImportAliases(),
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
