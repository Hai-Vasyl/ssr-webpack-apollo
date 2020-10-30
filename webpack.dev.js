const path = require("path")
// const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const nodeExternals = require("webpack-node-externals")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { StatsWriterPlugin } = require("webpack-stats-plugin")
// const HtmlWebpackPlugin = require("html-webpack-plugin")

const clientConfig = {
  target: "web",
  mode: "development",
  entry: "./client/index.tsx",
  output: {
    path: path.join(__dirname, "dist", "client"),
    filename: "bundle.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new StatsWriterPlugin({
      stats: {
        all: false,
        assets: true,
      },
    }),
    // new HtmlWebpackPlugin({
    //   template: "./client/index.html",
    // }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".scss", ".tsx", ".ts"],
  },
  // devServer: {
  //   contentBase: path.join(__dirname, "dist", "client"),
  //   compress: true,
  //   port: 9000,
  //   hot: true,
  //   open: true,
  //   historyApiFallback: true,
  // },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/dist/client/",
              hmr: true,
              reloadAll: true,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
}

const serverConfig = {
  target: "node",
  mode: "development",
  entry: {
    main: "./server/server.main.tsx",
    api: "./server/server.api.tsx",
  },
  devtool: "inline-source-map",
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, "dist", "server"),
    filename: "server.[name].js",
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: [".js", ".json", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
}

module.exports = [clientConfig, serverConfig]
