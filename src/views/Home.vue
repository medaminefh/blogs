<!-- <template>
	<h2>Home page</h2>
	<vue-easymde v-model="test" ref="editorInstance" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const test = ref("initial value");
</script> -->

<template>
	<div
		class="container d-flex w-100 justify-content-between align-items-center"
	>
		<RouterLink to="/blog/create" class="btn btn-primary"> Create </RouterLink>
		<button type="button" className="btn-close" title="Clear filter"></button>
	</div>
	<Transition>
		<ul class="posts mb-5">
			<Card
				v-for="blog in state.blogs"
				:setFilter="setFilter"
				:key="blog._id"
				:img_url="blog.img_url"
				:nonPublic="blog.private === 'true'"
				:categories="blog.categories"
				:id="blog._id"
				:handleDate="HandleDate"
				:updatedAt="blog.updatedAt"
				:short="blog.short"
				:title="blog.title"
				:long="blog.long"
			/>
		</ul>
	</Transition>
	<button className="btn btn-primary">Load More</button>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";
import { onMounted, watch } from "vue";
import { ref } from "vue";

const state = ref({
	blogs: [],
	pages: 1,
	token: localStorage.token,
	ServerURL: import.meta.env.VITE_SERVER_URL,
	error: false,
});

onMounted(() => {
	fetch(state.value.ServerURL + "/blogs", {
		headers: { authorization: state.value.token },
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.err) return;
			state.value.blogs = data.blogs;
			state.value.pages = Math.ceil(data.pages);
		})
		.catch((err) => {
			console.log(err);
			state.value.error = true;
			return;
		});
});

watch(state.value.blogs, (newValue) => {
	console.log({ newValue });
});
</script>
