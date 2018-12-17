const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.config.js");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //清除插件

const isProduction = process.env.NODE_ENV === "production";

console.log(process.env.NODE_ENV,'isProduction');
module.exports = merge(baseConfig, {
    mode: "production",
    entry: path.join(__dirname, "../src/entry-client.js"),
    output: {
        // chunkhash是根据内容生成的hash, 易于缓存,
        // 开发环境不需要生成hash，目前先不考虑开发环境，后面详细介绍
        filename: "static/js/[name].[chunkhash].js",
        chunkFilename: "static/js/[name].[chunkhash].js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.(le|sa|sc|c)ss$/,
                // use: ["vue-style-loader", "css-loader", "less-loader"],
                use: [isProduction ? MiniCssExtractPlugin.loader : "vue-style-loader", "css-loader", "less-loader"],
            },
        ],
    },
    optimization: {
        /**
         * @description 提取公共代码
         * @date 2018-07-31
         */
        // runtimeChunk: {
        //     name: "manifest"
        // },
        // splitChunks: {
        //   chunks: "initial",         // 必须三选一： "initial" | "all"(默认就是all) | "async"
        //   minSize: 0,                // 最小尺寸，默认0
        //   minChunks: 1,              // 最小 chunk ，默认1
        //   maxAsyncRequests: 1,       // 最大异步请求数， 默认1
        //   maxInitialRequests: 1,    // 最大初始化请求书，默认1
        //   name: () => {},              // 名称，此选项课接收 function
        //   cacheGroups: {                 // 这里开始设置缓存的 chunks
        //     priority: "0",                // 缓存组优先级 false | object |
        //     vendor: {                   // key 为entry中定义的 入口名称
        //       chunks: "all",        // 必须三选一： "initial" | "all" | "async"(默认就是异步)
        //       test: /vue|lodash/,     // 正则规则验证，如果符合就提取 chunk
        //       name: "vendor",           // 要缓存的 分隔出来的 chunk 名称
        //       minSize: 0,
        //       minChunks: 1,
        //       enforce: true,
        //       maxAsyncRequests: 1,       // 最大异步请求数， 默认1
        //       maxInitialRequests: 1,    // 最大初始化请求书，默认1
        //       reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
        //     }
        //   }
        // }
        splitChunks: {
            chunks: "initial", //initial(初始块)、async(按需加载块)、all(全部块)，默认为all
            minChunks: 1, //表示被引用次数，默认为1；
            // maxInitialRequests: 5, //最大的按需(异步)加载次数，默认为1；
            // minSize: 2, //表示在压缩前的最小模块大小，默认为0；
            // maxInitialRequests: 1, //最大的初始化加载次数，默认为1；
            minSize: 1,
            cacheGroups: {
                commons: {
                    name: "vendors", //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成
                },
            },
        },
    },
    plugins: [
        // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
        // 以便可以在之后正确注入异步 chunk。
        // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
        // new webpack.optimize.CommonsChunkPlugin({
        //   name: "manifest",
        //   minChunks: Infinity
        // }),
        // 此插件在输出目录中
        // 生成 `vue-ssr-client-manifest.json`。
        /**
         * @description 清除dist文件夹下所有文件插件
         * @date 2018-07-31
         */
        new CleanWebpackPlugin("dist", {
            root: path.resolve(__dirname, "../"),
        }),
        new VueSSRClientPlugin(),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash].css",
            chunkFilename: "static/css/[name].[contenthash].css",
        }),
        //  当vendor模块不再改变时, 根据模块的相对路径生成一个四位数的hash作为模块id
        new webpack.HashedModuleIdsPlugin(),
    ],
});
