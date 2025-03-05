const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point
  devServer: {
    proxy: {
        "/upload": "http://localhost:3000"  // ✅ Redirect API calls to backend
    }
   },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Cleans the dist folder before each build
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/i, // Match image files
        type: "asset", // Let Webpack decide (inline or file)
        generator: {
          filename: "images/[name][ext]", // Output folder for images
        },
        use: [
          {
            loader: "image-webpack-loader", // Compress images
            options: {
              mozjpeg: { progressive: true, quality: 70 },
              optipng: { optimizationLevel: 5 },
              pngquant: { quality: [0.65, 0.90], speed: 4 },
              gifsicle: { interlaced: false },
              webp: { quality: 75 },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    static: "./dist",
    port: 8080,
    hot: true, // Enable Hot Module Replacement
  },
  mode: "development",
};
