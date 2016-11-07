var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

//console.log('proicess env', process.env)
// var isProd = JSON.parse(process.env.PROD || 'false')

const isProd = process.argv.indexOf('-p') !== -1;

console.log('Is Production build: ', isProd)
var publicPath
// local host \ prod
if (isProd) {
    publicPath = 'https://davojta.github.io/gender_map/'
} else {
    publicPath = '/'
}


//need to studio and artists photo to be referenced from another site
var definePlugin = new webpack.DefinePlugin({
    __PROD__: JSON.stringify(isProd)
})

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
        path: path.join(__dirname, 'dist/'),
        filename: "bundle.js",
        publicPath: publicPath,
        devtool: 'inline-source-map'
    },
    debug: !isProd,
    devtool: 'inline-source-map',
    plugins: [
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: './templates/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
        title: 'Content page for gender map',
        template: 'content.ejs', // Load a custom template (ejs by default see the FAQ for details)
        filename: 'content.html'
    }),
        definePlugin
    ],
    url: {
        dataUrlLimit:1024 //1kb
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
            // { test: /\.svg/, loader: 'svg-url-loader' },
            // the url-loader uses DataUrls.
            // the file-loader emits files.
            { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader" },
            { test: /\.eot$/,    loader: "file-loader" },
            // { test: /\.svg$/,    loader: "file-loader" },
            // Bootstrap 3
            { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },
            //leaflet
            {test: /\.(png|jpg||svg)$/, loader: "file-loader?name=images/[name].[ext]"}
        ]
    }
}
