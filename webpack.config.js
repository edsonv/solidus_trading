const glob = require('glob-all')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const PurifyCSSPugin = require('purifycss-webpack')
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
        test: /.(css)$/,
        use: [{
            // Add CSS to the DOM by injecting a '<style>' tag
            loader: 'style-loader'
          },
          {
            loader: MiniCSSExtractPlugin.loader
          },
          {
            // Interprets '@imports' and 'url()' like 'import/require' and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              config: {
                path: './'
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
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
    // new PurifyCSSPugin({
    //   paths: glob.sync([
    //     path.join(__dirname, 'src/*.html'),
    //     path.join(__dirname, 'src/js/*.js')
    //   ]),
    //   purifyOptions: {
    //     whitelist: []
    //   }
    // })
  ]
}