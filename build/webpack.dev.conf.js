const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")


module.exports = {
  mode: "development",
  // output: {
  //   filename: 'bundle.js'
  // },
  devServer: {
    publicPath: "/",
    port: "8000",
    proxy: {
      // 代理请求
      // "/api": {
      //   target: "http://localhost:3000",
      //   pathRewrite: {"^/api" : ""}
      // }
    },
    // quiet: true,
  },
  stats: "minimal", // 控制台日志显示控制
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"',
        ENV_CONFIG: '"dev"',
        BASE_URL: '"https://dev.api****"'
      }
    }),
    new FriendlyErrorsPlugin()
  ]
};