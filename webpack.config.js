const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');

const config = {
  context: path.join(__dirname),
  entry: './client/src/client.js',
  output: {
    path: path.join(__dirname, '/client/dist/'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015']
        },
        exclude: path.join(__dirname, '/node_modules')
      }
    ]
  },
  plugins: [
    new CopyWebPackPlugin([
      { from: './client/src/index.html', to: '../dist/index.html'}
    ])
  ]
}

module.exports = config;
