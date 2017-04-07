const LIB_NAME = 'event-target-mixin';

const path = require('path');
const webpack = require('webpack');

let config = [];

function generateConfig(name) {
  const uglify = name.indexOf('min') > -1;
  let config = {
    devtool: 'source-map',
    entry: './index.js',
    output: {
      filename: `${name}.js`,
      library: LIB_NAME,
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
      sourceMapFilename: `${name}.js.map`
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'eslint-loader',
          enforce: 'pre',
          exclude: /node_modules/
        },
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    }
  };

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ];
  if (uglify) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }));
  }

  return config;
}

[LIB_NAME, `${LIB_NAME}.min`].forEach((name) => {
  config.push(generateConfig(name));
});
module.exports = config;

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log(module.exports);
