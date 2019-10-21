module.exports = function({ config }) {
  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [
      {
        loader: require.resolve('@storybook/source-loader'),
        options: {
          prettierConfig: {
            printWidth: 100,
            semi: true,
            tabWidth: 2,
            useTabs: false,
            jsxBracketSameLine: false,
            singleQuote: true,
            trailingComma: 'all',
            arrowParens: 'always',
          },
        },
      },
    ],
    enforce: 'pre',
  });

  return config;
};
