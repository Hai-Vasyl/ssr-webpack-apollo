const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const nodeExternals = require("webpack-node-externals")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { StatsWriterPlugin } = require("webpack-stats-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const clientConfig = {
  target: "web",
  mode: "production",
  entry: "./client/index.tsx",
  output: {
    path: path.join(__dirname, "dist", "client"),
    filename: "bundle.[contenthash].js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
    }),
    new CompressionPlugin(),
    new OptimizeCssAssetsPlugin(),
    new StatsWriterPlugin({
      stats: {
        all: false,
        assets: true,
      },
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".scss", ".tsx", ".ts"],
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
  mode: "production",
  entry: {
    main: "./server/server.main.tsx",
    api: "./server/server.api.tsx",
  },
  devtool: "inline-source-map",
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  output: {
    path: path.join(__dirname, "dist", "server"),
    filename: "server.[name].js",
  },
  plugins: [new CleanWebpackPlugin(), new CompressionPlugin()],
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
