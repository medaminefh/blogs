<template>
	<header class="py-5">
		<div className="container flex justify-between items-center">
			<h2>Med Blogs</h2>
			<NuxtLink
				v-if="isAuthenticated()"
				to="/blog/create"
				class="bg-white hover:bg-gray-100 text-gray-800 font-medium py-2 px-4 border border-gray-400"
			>
				Create
			</NuxtLink>
		</div>
	</header>
	<slot />

	<footer className="text-gray-700 text-center">
		<ul className="social__media">
			<li>
				<a
					rel="noreferrer noopener"
					target="_blank"
					href="https://github.com/medaminefh"
					className="text-secondary"
				>
					<i className="fa fa-github"></i>
				</a>
			</li>
			<li>
				<a
					rel="noreferrer noopener"
					target="_blank"
					href="https://twitter.com/medaminefh"
					className="text-secondary"
				>
					<i className="fa fa-twitter"></i>
				</a>
			</li>
			<li>
				<a
					rel="noreferrer noopener"
					target="_blank"
					href="https://www.linkedin.com/in/mohamed-amine-fhal"
					className="text-secondary"
				>
					<i className="fa fa-linkedin"></i>
				</a>
			</li>
		</ul>
		<span>&copy;medaminefh</span>
	</footer>
</template>
<script setup>
import "./assets/css/index.css";

import { isAuthenticated } from "@/utils";

const token =
	typeof window !== "undefined" ? localStorage.getItem("token") : null;
</script>
