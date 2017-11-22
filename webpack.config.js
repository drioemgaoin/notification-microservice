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
                loader: ExtractTextPlugin.extract('css-loader!sass-loader')
            },
            {
                test: /\.png$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.jpg$/,
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            },
            { 
                test: /\.html$/, 
                loader: 'html-loader'
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
