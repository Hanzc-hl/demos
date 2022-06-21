const { merge } = require("webpack-merge");

const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const mockServer = require("./mock/server");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ],
  optimization: {
    minimize: false,
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
  stats: "minimal",
});
