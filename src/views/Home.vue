<template>
	<SearchForm />
	<div
		class="container d-flex w-100 justify-content-between align-items-center"
	>
		<RouterLink to="/blog/create" class="btn btn-primary"> Create </RouterLink>
		<button title="Clear filter">X</button>
	</div>

	<Transition>
		<ul class="posts mb-5">
			<SkeletonVue
				v-for="i in [1, 2, 3, 4, 5, 6, 7]"
				v-if="state.blogs.length == 0"
			/>
			<Card
				v-else
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
import SkeletonVue from "@/components/Skeleton.vue";
import SearchForm from "@/components/SearchForm.vue";
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
