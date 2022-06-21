const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const AntLessVars = {
  "primary-color": "#000",
};

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
          loader: "babel-loader", // 在babalrc中，添加了"@babel/preset-typescript", 用于去除ts语法，ts在项目中只用做编译前类型校验，与tsconfig中的noEmit对应。
        },
      },
      {
        test: /\.(less|css)$/,
        exclude: [/node_modules/, path.resolve(__dirname, "src/app.less")], // 对项目中的样式启用css modules
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]--[hash:base64:5]",
              },
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(less|css)$/,
        include: [/node_modules/, path.resolve(__dirname, "src/app.less")], // 对项目外的样式不启用css modules
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: AntLessVars, // 定制antd主题
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i, // 打包图片资源
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["home", "commons"],
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          priority: 10,
        },
        commons: {
          name: 'commons',
          test: /\/src\//,
          chunks: "all",
          minSize: 1024,
          priority: 5,
        },
      },
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
