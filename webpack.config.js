const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWepackPlugin = require('copy-webpack-plugin');
const ImageminJpegoptim = require('imagemin-jpegoptim');


module.exports = {
    mode: 'development',
    entry: './src/scripts/app.js',
    output: {
        path: path.resolve(__dirname, 'dist/scripts'),
        filename: 'bundle.js'
    },
    module: {
        // Set up the tasks here
        rules: [
            {
                // Transpile from es6 to es5 all files end with .js
                test: /\.js?/i,
                exclude: /node_modules/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.s?css?/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: { 
                            name: '[name].[ext]',
                            outputPath: '../images'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: '../index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '../styles/main.css'
        }),
        new ImageminPlugin({
            test:/\.(jpe?g|png|gif|svg)?/i,
            plugins: [
                ImageminJpegoptim({
                    size: '50%',
                    progressive: true
                })
            ]
        })
    ]
}
