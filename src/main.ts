import { createApp } from "vue";
import App from "./App.vue";
import VueEasymde from "vue3-easymde";
import "easymde/dist/easymde.min.css";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Blog from "@/views/Blog.vue";
import Admin from "./views/Admin.vue";

import "@/assets/index.css";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/blog",
		name: "Blog",
		component: Blog,
	},
	{
		path: "/admin",
		name: "Admin",
		component: Admin,
	},
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: Home,
	},
];

const router = createRouter({
	routes,
	history: createWebHistory(),
});

createApp(App).use(VueEasymde).use(router).mount("#app");