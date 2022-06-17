const { merge } = require("webpack-merge");

const TerserWebpackPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const prod = require("./webpack.prod");

module.exports = merge(prod, {
  plugins: [
    new BundleAnalyzerPlugin({ analyzerPort: 8081, openAnalyzer: true }),
  ]
});
