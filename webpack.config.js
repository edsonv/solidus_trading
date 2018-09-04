const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js'),
    about: path.resolve(__dirname, 'src/js/about.js'),
    strategies: path.resolve(__dirname, 'src/js/strategies.js'),
    products: path.resolve(__dirname, 'src/js/products.js'),
    contact: path.resolve(__dirname, 'src/js/contact.js'),
  },
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
        test: /.(css|scss)$/,
        use: [{
            loader: 'style-loader',

          },
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          {
            loader: 'css-loader',

          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: './'
              }
            }
          },
          // {
          //   loader: 'sass-loader',
          // }
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
      filename: './index.html',
      template: './src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: './about.html',
      template: './src/about.html'
    }),
    new HtmlWebpackPlugin({
      filename: './strategies.html',
      template: './src/strategies.html'
    }),
    new HtmlWebpackPlugin({
      filename: './products.html',
      template: './src/products.html'
    }),
    new HtmlWebpackPlugin({
      filename: './contact.html',
      template: './src/contact.html'
    }),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
  ]
}