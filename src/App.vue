<template>
	<header>
		<div className="container">
			<h2>Med Blogs</h2>
		</div>
	</header>
	<router-view v-slot="{ Component }">
		<transition>
			<div class="container">
				<component :is="Component" />
			</div>
		</transition>
	</router-view>
	<footer className="text-secondary text-center">
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
<script lang="ts" setup></script>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
	transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
