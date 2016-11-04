var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: "./index.js",
    resolve: {
        extensions: ['', '.html', '.js', '.json', '.scss', '.css'],
        alias: {
            leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css",
            leaflet_marker: __dirname + "/node_modules/leaflet/dist/images/marker-icon.png",
            leaflet_marker_2x: __dirname + "/node_modules/leaflet/dist/images/marker-icon-2x.png",
            leaflet_marker_shadow: __dirname + "/node_modules/leaflet/dist/images/marker-shadow.png"
        }
    },
    output: {
        path: 'dist/',
        filename: "../bundle.js",
        publicPath: '/',
        devtool: 'inline-source-map'
    },
    debug: true,
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './templates/index.html',
            filename: '../index.html'
        }),
        new HtmlWebpackPlugin({
        title: 'Content page for gender map',
        template: 'content.ejs', // Load a custom template (ejs by default see the FAQ for details)
        filename: 'content.html'
    })],
    url: {
        dataUrlLimit: 1024 //1kb
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.svg/, loader: 'svg-url-loader' },
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            // { test: /\.svg$/,    loader: "file-loader" },
            // Bootstrap 3
            { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },
            //leaflet
            {test: /\.(png|jpg)$/, loader: "file-loader?name=images/[name].[ext]"}
        ]
    }
};
