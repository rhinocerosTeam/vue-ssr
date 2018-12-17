// 第 1 步：创建一个 Vue 实例
const Vue = require("vue");
const { createBundleRenderer } = require("vue-server-renderer");

const express = require("express");
const server = express();
const fs = require("fs");
const path = require("path");

// 第 2 步：创建一个 renderer
const template = fs.readFileSync("./src/index.html", "utf-8");
const serverBundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");
// const createApp = require('./dist/built-server-bundle.js')

const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
});

server.use("/", express.static(path.join(__dirname, 'dist')));

// 在服务器处理函数中……
server.get("*", (req, res) => {
    const context = {
        url: req.url,
        meta: `
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        `,
    };
    // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
    // 现在我们的服务器与应用程序已经解耦！
    renderer.renderToString(context, (err, html) => {
        // 处理异常……
        console.log(html);
        if (err) {
            res.status(500).end("Internal Server Error");
            return;
        }
        res.end(html);
    });
});

server.listen(8080);
console.log("启动服务");
// 在 2.5.0+，如果没有传入回调函数，则会返回 Promise：
// renderer.renderToString(app).then(html => {
//   console.log(html)
// }).catch(err => {
//   console.error(err)
// })
