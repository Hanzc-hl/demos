const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");

const mockServer = require("./mock/server");

module.exports = {
  entry: {
    home: "./src/index.js",
    react_family: ["react", "react-dom"],
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: (pathData) => {
      return "[name].js";
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,                // js | jsx中的es6语法和jsx语法, 需要用babel-loader处理
        exclude: /node_modules/,        // webpack 打包从entry解析, 也会解析到node_modules中引入的外部模块, 外部模块一般都是已经打包好的, 所以不用再处理
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['home', 'react_family', 'common'],
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  devServer: {
    setupMiddlewares: (middlewares, devServer) => {
      if(!devServer) throw new Error('webpack-dev-server is not defined');
      mockServer(devServer.app);
      return middlewares;
    }
  },
  stats: 'none'
};
