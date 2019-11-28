const webpack = require("webpack");
const path = require("path");

let config = env => {

  let NODE_ENV = env.NODE_ENV;
  let development = NODE_ENV === "development";
  let production = NODE_ENV === "production";

  return {
    entry: {
      bundle: "./src/main/webapp/resources/typescript/bundle.ts",
      scrollsync_bundle: "./src/main/webapp/resources/typescript/scrollSyncBundle.tsx"
    },
    devtool: development ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      path: path.resolve(__dirname, "./src/main/webapp/resources/js"),
      filename: "./dist/[name].js"
    },
    mode: NODE_ENV,
    watch: development,
    watchOptions: {
      poll: 1000 // Check for changes every second
    }
  }
};

module.exports = config;