const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/scripts/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        // Set up the tasks here
        rules: [
            {
                // Translate es6 to es5
                test: /\.js?/i,
                exclude: /node_modules/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    },
    plugins: []
}