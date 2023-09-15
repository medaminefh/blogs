import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import VueEasymde from "vue3-easymde";
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Blog from "@/views/Blog.vue";
import Admin from "./views/Admin.vue";
import CreateBlog from "@/views/CreateBlog.vue";
import vue3GoogleLogin from "vue3-google-login";
import { isAuthenticated } from "./utils";

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
		beforeEnter: (to: any, from: any, next: any) => {
			// reject the navigation
			if (isAuthenticated()) next();
			else next({ name: "Home" });
		},
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

const pinia = createPinia();

createApp(App)
	.use(router)
	.use(pinia)
	.use(VueEasymde)
	.use(vue3GoogleLogin, {
		clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
	})
	.mount("#app");
