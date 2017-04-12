// Notes:
// * Named webpack.config.babel.js to allow ES6 in this file
// * modules: false in "presets: [['es2015', {modules: false}]]" is for tree shaking
// * Ignore the loaderUtils DeprecationWarning
// * Running webpack -p will automatically Uglify

import path from 'path';
import webpack from 'webpack';

const libName = 'event-target-mixin';

function generateConfig(name) {
  let entry = {};
  entry[name] = './index.js';
  let config = {
    devtool: 'cheap-module-source-map',
    entry: entry,
    output: {
      filename: '[name].js',
      library: libName,
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist/webpack'),
      sourceMapFilename: '[name].js.map'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          exclude: /node_modules/,
          test: /\.(js|jsx)$/,
          use: 'eslint-loader'
        },
        {
          exclude: /node_modules/,
          test: /\.(js|jsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              // Override here because "modules: false" will break webpack in .babelrc
              presets: ['es2015']
            }
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      })
    ]
  };

  if (process.env.NODE_ENV === 'development') {
    config.devtool = 'eval-source-map';
  }

  return config;
}

module.exports = generateConfig(libName);

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log(module.exports);
