const path = require("path");

/**
 * @deprecated
 * @reason  实验发现轻度使用第三方包时，使用DllPlugin对打包时间提升不大，但体积会增加很多，
 *          替代方案可以使用splitChunkPlugin提取第三方包，打包体积和打包时间都不错
 */

// DllPlugin只处理第三方js文件，不需要处理css文件
const DllPlugin = require("webpack").DllPlugin;

module.exports = {
  mode: "development",
  entry: {
    vendor: ["react", "react-dom/client", "react-router-dom"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/dll"),
    library: "[name]",
    clean: {
      keep: /manifest.json$/,
    },
  },
  plugins: [
    new DllPlugin({
      name: "[name]",
      path: path.resolve(__dirname, "dist/dll", "[name].manifest.json"),
    }),
  ],
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
};

// DllReferencePlugin 和 AddAssetHtmlPlugin 配合使用
// new DllReferencePlugin({
//   manifest: path.resolve(__dirname, "dist/dll", "vendor.manifest.json"),
// }),
// new AddAssetHtmlPlugin([
//   {
//     filepath: path.resolve(__dirname, "dist/dll/vendor.js"),
//     outputPath: "dll",
//     publicPath: "dll",
//     includeSourcemap: false,
//   },
// ]),
