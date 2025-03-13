var path = require('path');
var webpack = require('webpack')

module.exports = {
    entry: {
        "cim": "./src/socket.js"
    },
    output: {
        path: __dirname,
        filename: "build/[name].js",
        libraryTarget: 'umd',
        library: 'CIM', // 导出的变量名
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', "stage-0"]
                }
            }
        ],
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            output: { comments: false },
        })
    ],
}