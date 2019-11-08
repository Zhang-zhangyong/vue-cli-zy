const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const vueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].min.js",
    chunkFilename: "js/[name].min.js"
  },
  optimization: {
    splitChunks: {
      chunks: "initial",
      minSize: 30, // 模块的最小体积
      minChunks: 1, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      automaticNameDelimiter: '~', // 文件名的连接符
      name: 'vendor',
      cacheGroups: { // 缓存组
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      dry: false,
      // cleanOnceBeforeBuildPatterns: ['**/*', '!dist/*.*']
    }),
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
    new vueLoaderPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: "static",
        ignore: [".*"],
        // transform() {
        //   return new UglifyJsPlugin()
        // }
      }
    ]),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
        ENV_CONFIG: '"prod"',
        BASE_URL: '"https://prodction.api****"'
      }
    }),
    new ExtractTextPlugin("./style/styles.css"),
    // webpack4 已经移除该方法 改为config.optimization.splitChunks
    // new webpack.CommonsChunkPlugin({ 
    //   name: 'vendor',
    //   filename: '[name].js'
    // })
  ]
};
