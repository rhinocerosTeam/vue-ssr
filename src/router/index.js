// router.js
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export function createRouter() {
    return new Router({
        mode: "history",
        routes: [
            { path: "/home", component: () => import("../components/home.vue") },
            { path: "/about", component: () => import("../components/about.vue") },
            {
                path: "*", //其他页面，强制跳转到登录页面
                name: "*",
                redirect: "/home",
            },
        ],
    });
}
