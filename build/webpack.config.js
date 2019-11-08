
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function styleLoaders(env, loaders) {
  if(env.production) {
    return ExtractTextPlugin.extract({
      use: loaders,
      fallback: "vue-style-loader"
    })
  } else {
    return ["vue-style-loader"].concat(loaders)
  }
}

const createLintingRule = () => {

}
// function createLintingRule() {

  
// }

module.exports = env => {
  env = env || {};
  return {
    entry: "./src/main.js",
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: styleLoaders(env, ["css-loader", "sass-loader"]),
          // use: ExtractTextPlugin.extract({
          //   fallback: "vue-style-loader",
          //   use: ["vue-style-loader", "css-loader"],
          // })
        },
        {
          test: /\.(css|scss)$/,
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            config: {
              path: ".postcss.config.js" // 这个得在项目根目录创建此文件
            }
          }
        },
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          include: [
            path.resolve("src"),
            path.resolve("node_modules/webpack-dev-server/client"),
            path.resolve("node_modules/postcss-loader/src"),
          ],
          // options: {
          //   presets: ["@babel/preset-env"],
          // }
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: "url-loader",
          options: {
            limit: 10000,
            name: "img/[name].[hash:7].[ext]"
          }
        },
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [resolve('src')],
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: true
          }
        },
      ]
    },
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        vue: "vue/dist/vue.esm",
        "@": resolve("src")
      }
    },
    ...(env.development
      ? require("./webpack.dev.conf")
      : require("./webpack.prod.conf"))
  };
};
