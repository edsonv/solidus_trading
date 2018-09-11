const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      path.resolve(__dirname, 'src/js/util.js')
    ],
    main: [
      path.resolve(__dirname, 'src/js/index.js'),
      path.resolve(__dirname, 'src/js/about.js'),
      path.resolve(__dirname, 'src/js/strategies.js'),
      path.resolve(__dirname, 'src/js/products.js'),
      path.resolve(__dirname, 'src/js/contact.js'),

    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: Infinity,
    }

  },
  module: {
    rules: [{
        // Manage HTML files
        test: /.html$/,
        use: [{
          loader: 'html-loader',
          options: { minimize: true }
        }]
      },
      {
        test: /.(css|scss)$/,
        use: [{
            // Add CSS to the DOM by injecting a '<style>' tag
            loader: 'style-loader'
          },
          {
            // Extracts CSS into separate files. Creates a CSS file per JS file wich contains CSS
            loader: MiniCSSExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            // Interprets '@imports' and 'url()' like 'import/require' and will resolve them
            loader: 'css-loader',

          }, {
            //Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              config: {
                path: './'
              }
            }
          },

          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
          },
        ]
      },
      {
        // Manage image files
        test: /.(jpg|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 20000,
            name: 'img/[name].[ext]'
          }
        }
      },
    ]
  },
  plugins: [
    //Creation of HTML files to serve the bundles
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './src/index.html',
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
      chunkFilename: '[id].css',
    }),
    // Clean unused CSS
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/*`, { nodir: true })
    }),
    // Insert favicons in all the HTML files
    new FaviconsWebpackPlugin({
      logo: './src/img/favicon.png',
      prefix: 'favicons/',
      inject: true,
      icons: {
        android: true,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    }),
  ]
}