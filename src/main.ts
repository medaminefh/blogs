import { createApp } from "vue";
import App from "./App.vue";
import VueEasymde from "vue3-easymde";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Blog from "@/views/Blog.vue";
import Admin from "./views/Admin.vue";
import CreateBlog from "@/views/Create.vue";
import vue3GoogleLogin from "vue3-google-login";

import "@/assets/index.css";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/blog/:id",
		name: "Blog",
		component: Blog,
	},
	{
		path: "/admin",
		name: "Admin",
		component: Admin,
	},
	{
		path: "/blog/create",
		name: "Create",
		component: CreateBlog,
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

createApp(App)
	.use(VueEasymde)
	.use(router)
	.use(vue3GoogleLogin, {
		clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
	})
	.mount("#app");
