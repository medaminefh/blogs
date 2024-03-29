import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import VueEasymde from "vue3-easymde";
import { createRouter, createWebHashHistory } from "vue-router";
import { isAuthenticated } from "./utils";
import vue3GoogleLogin from "vue3-google-login";
import Home from "@/views/Home.vue";
import Blog from "@/views/Blog.vue";
import Admin from "./views/Admin.vue";
import CreateBlog from "@/views/CreateBlog.vue";

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
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
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
