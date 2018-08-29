
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
      test: /.html$/,
      use: [{
        loader: 'html-loader',
        options: { minimize: true }
      }]
    },
    {
      test: /.css$/,
      use: [
      'style-loader',
      MiniCSSExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: './'
          }
        }
      }
      ]
    },
    {
      test: /.(jpg|jpeg|gif|bmp|png|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: 'img/[name].[ext]'
        }
      }
    }
    ]
  },
  plugins: [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src/index.html')
  }),
  new MiniCSSExtractPlugin({
    filename: 'css/[name].css',
    chunkFilename: '[id].css'
  }),
  ]
}
