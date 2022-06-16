const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const mockServer = require("./mock/server");

module.exports = {
  entry: {
    home: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name]_[chunkhash:8].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // js | jsx中的es6语法和jsx语法, 需要用babel-loader处理
        exclude: /node_modules/, // webpack 打包从entry解析, 也会解析到node_modules中引入的外部模块, 外部模块一般都是已经打包好的, 所以不用再处理
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["home", "commons"],
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) throw new Error("webpack-dev-server is not defined");
      mockServer(devServer.app);
      return middlewares;
    },
  },
  stats: "none",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
