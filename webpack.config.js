const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
    entry: [
        path.resolve(ROOT_PATH, 'web/index')
    ],

    output: {
        path: path.join(__dirname, '/web/dist/'),
        filename: '[name].js'
    },

    target: 'web',

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    devServer: {
        contentBase: path.resolve(ROOT_PATH, 'web/dist'),
        historyApiFallback: true,
        hot: false,
        inline: true,
        progress: true
    },

    plugins: [
        new HtmlwebpackPlugin({
          title: 'Notification UI',
          template: 'web/index.html',
          inject: 'body',
          filename: 'index.html'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
};
