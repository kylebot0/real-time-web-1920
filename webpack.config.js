const path = require("path");

const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        main: "./src/public/js/script.js",
        styles: "./src/public/css/style.css",
    },
    output: {
        path: path.resolve(__dirname, "src/public/dist"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new FixStyleOnlyEntriesPlugin(),
        new OptimizeCSSAssetsPlugin({})
    ]
}