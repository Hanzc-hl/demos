const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const DllReferencePlugin = require("webpack").DllReferencePlugin;
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  entry: {
    home: "./src/index.js",
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name]_[chunkhash:8].js",
    clean: {
      keep: /dll/,
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/, // js | jsx中的es6语法和jsx语法, 需要用babel-loader处理
        exclude: /node_modules/, // webpack 打包从entry解析, 也会解析到node_modules中引入的外部模块, 外部模块一般都是已经打包好的, 所以不用再处理
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[hash:base64:5]",
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["home", "commons"],
    }),
    new DllReferencePlugin({
      manifest: path.resolve(__dirname, "dist/dll", "vendor.manifest.json"),
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, "dist/dll/vendor.js"),
        outputPath: "dll",
        publicPath: "dll",
        includeSourcemap: false,
      },
    ]),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
