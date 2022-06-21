const { merge } = require("webpack-merge");

const TerserWebpackPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "production",
  optimization: {
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
  performance: {
    hints: false,
  },
  stats: {
    groupModulesByAttributes: false,
    groupModulesByCacheStatus: false,
    groupModulesByExtension: false,
    groupModulesByLayer: false,
    groupModulesByPath: false,
    groupModulesByType: false,
  },
});
