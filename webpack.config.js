const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname);
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        path.resolve(ROOT_PATH, 'web/index')
    ],

    output: {
        path: path.join(__dirname, '/web/dist/'),
        filename: '[name].js',
        publicPath: '/'
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
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"  // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader"    // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader"   // compiles Sass to CSS
                    }
                ]
            }
        ]
    },

    devServer: {
        contentBase: path.resolve(ROOT_PATH, 'web/dist'),
        historyApiFallback: true,
        hot: true,
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ExtractTextPlugin('notification-ui.css', {
            allChunks: true
        })
    ]
};
