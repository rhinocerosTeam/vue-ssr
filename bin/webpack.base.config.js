const VueLoaderPlugin = require("vue-loader/lib/plugin");

// CSS 提取应该只用于生产环境
// 这样我们在开发过程中仍然可以热重载
var config = {
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.js$/, //资源路径
                loader: 'babel-loader', //该路径执行的loader
                exclude: /(node_modules)/,
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '/static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '/static/media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '/static/fonts/[name].[hash:7].[ext]'
                }
            }
        ],
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        // new MiniCssExtractPlugin({
        //     filename: "style.css",
        // }),
    ],
};

module.exports = config;
