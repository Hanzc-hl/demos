const path = require("path");

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
