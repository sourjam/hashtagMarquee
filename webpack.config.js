const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

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
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!postcss-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("client.css"),
    new CopyWebPackPlugin([
      { from: './client/src/index.html', to: '../dist/index.html'}
    ])
  ]
}

module.exports = config;
