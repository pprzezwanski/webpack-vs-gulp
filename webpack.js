const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

// utility for config
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development'; 

const p = path => path.resolve(__dirname, path);

module.exports = {
  mode: devMode ? 'development' : 'production',
  devServer: {
    // contentBase: path.resolve(__dirname, '/dist'), 
    // contentBase: './dist',
    watchContentBase: true,
    // writeToDisk: true,
    hot: true,
    overlay: true
  },
  entry: {
    bundle: [/* 'babel-polyfill',  */'./src/js/vendor/lity.js', './index.js']
  },
  output: {
    filename: '[name].min.js', // 'bundle.min.js',
    path: path.resolve(__dirname, devMode ? 'dist' : 'dist/js'),
    publicPath: '/'
  },
  performance: { hints: false },
  // resolve: { extensions: [ '.js', '.scss', '.pug'] },
  optimization: { // thi isone only because of a bug in production (no js modules in the bundle)
    sideEffects: devMode ? true : false
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { 
            presets: ['@babel/preset-env'] 
          }
        },
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        include: /src\/images/,
        loader: 'file-loader',
        query:{
            outputPath: devMode ? './img' : '../img/',
            // publicPath: '../img/',
            name: '[name].[ext]?[hash]'
        }
      },
      {
          test: /\.(eot|ttf|otf|woff|woff2|json|xml)$/,
          loader: 'file-loader',
          query:{
              outputPath: devMode ? './fonts/' : '../fonts/',
              name: '[name].[ext]?[hash]'
          }
      },
      {
          test: /\.(json|xml)$/,
          loader: 'file-loader',
          query:{
              outputPath: devMode ? './data/' : '../data/',
              name: '[name].[ext]?[hash]'
          }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: devMode ? true : false,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: devMode ? true : false,
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: devMode ? true : false,
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'css/styles.css' : '../css/styles.css',
      // filename: devMode ? '[name].css' : '[name].[hash].css',
      // chunkFilename: "[id].css"
    }),
    new HtmlWebPackPlugin({
      template: 'src/pug/index.pug',
      inject: devMode ? true : false,
      // title: 'Kibo-commerce'
      filename: devMode ? './index.html' : '../index.html',
      // excludeChunks: [ 'onLoad' ]
    }),
    new CopyWebpackPlugin([
      /* { from: './php/', to: './php/' }, */
      { from: 'src/images/', to: devMode ? './images/' : '../images/' },
      // { from: './css/vendor/', to: './css/vendor/' },
      // { from: './js/vendor/', to: './js/vendor/' }
    ]),
    new SVGSpritemapPlugin([
      'src/icons/*.svg'
    ], {
      sprite: {
        prefix: false,
        generate: { use: true }
      },
      output: {
        filename: devMode ? 'icons/sprite.svg' : '../icons/sprite.svg'
      }
    }),
    new SVGSpritemapPlugin([
      'src/icons/partners/*.svg',
    ], {
      sprite: {
        prefix: false,
        generate: { use: true }
      },
      output: {
        filename: devMode ? 'icons/sprite-partners.svg' : '../icons/sprite-partners.svg',
      }
    }),
    new CleanWebpackPlugin(
      devMode ? '' : 'dist'
    ),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      bodyScrollLock: 'body-scroll-lock'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]/* ,
  devServer: {
    proxy: {
      '/': {
        //target: 'http://localhost:8080/',
        target: 'http://localhost:81/Nikolet_Burzynska_com-production/',
        changeOrigin: true
      }
    }
  } */
    
  /* new BrowserSyncPlugin(
  {
      proxy: 'http://localhost:8080',
      files: [
          {
              match: [ */
//                  '**/*.php'
              /*  ],
              fn: function(event, file) {
                  if (event === "change") {
                      const bs = require('browser-sync').get('bs-webpack-plugin');
                      bs.reload();
                  }
              }
          }
      ]
  },
  {
      reload: false
  })*/
  
};

console.log('mode: ', module.exports.mode);
