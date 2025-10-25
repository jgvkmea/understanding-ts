const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const env = dotenv.config().parsed;

// dotenvで読み込んだ値をDefinePluginで環境変数として埋め込む
const envKeys = Object.keys(env).reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(env[key]);
  return acc;
}, {});

module.exports = {
  mode: "development",
  entry: "./src/section13/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
  },
  devtool: "inline-source-map",
  plugins: [new webpack.DefinePlugin(envKeys)],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { onlyCompileBundledFiles: true },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
