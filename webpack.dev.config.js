const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src/js/index.js'),
    about: path.resolve(__dirname, 'src/js/about.js'),
    strategies: path.resolve(__dirname, 'src/js/strategies.js'),
    products: path.resolve(__dirname, 'src/js/products.js'),
    contact: path.resolve(__dirname, 'src/js/contact.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    compress: true,
    open: true,
    overlay: true,
    port: 9000,
  },
  module: {
    rules: [{
        test: /.html$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: false }
        }]
      },
      {
        test: /.css$/,
        use: [{
            // Agrega CSS al DOM inyectando la etiqueta <style>
            loader: 'style-loader'
          },
          {
            // Extrae los archivos css en archivos separados
            loader: MiniCSSExtractPlugin.loader
          },
          {
            // Interpreta @import y url() como import/require()
            loader: 'css-loader'
          },
          {
            //Procesar CSS con Postcss
            loader: 'postcss-loader',
            options: {
              config: {
                path: './'
              }
            }
          },
        ]
      }, {
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
    new WriteFilePlugin({
      test: /^(?!.*(hot)).*/,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: './index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      inject: true,
      chunks: ['about'],
      filename: './about.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/strategies.html',
      inject: true,
      chunks: ['strategies'],
      filename: './strategies.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/products.html',
      inject: true,
      chunks: ['products'],
      filename: './products.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/contact.html',
      inject: true,
      chunks: ['contact'],
      filename: './contact.html',
    }),
    new MiniCSSExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
  ]
}