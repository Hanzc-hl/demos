const { merge } = require("webpack-merge");

const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const mockServer = require("./mock/server");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new BundleAnalyzerPlugin({ analyzerPort: 8081, openAnalyzer: false }),
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
