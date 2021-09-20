const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const globImporter = require('node-sass-glob-importer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  mode: "development",
  watch: true,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                importer: globImporter()
              }
            }
          },
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: path.resolve(__dirname, "src/index.html"),
      filename: 'index.html',
      inject: true,
      minify: false
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 5006,
      server: { baseDir: ['dist'] }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      ignoreOrder: false
    }),
  ],
};