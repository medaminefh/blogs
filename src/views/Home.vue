<template>
	<SearchForm />
	<div class="container flex justify-end">
		<button
			@click="filterBy = ''"
			title="Clear filter"
			class="mt-4 w-10 h-10 rounded-full text-lg text-center border border-slate-500 cursor-pointer"
		>
			X
		</button>
	</div>
	<ul class="posts mb-5">
		<SkeletonVue
			v-for="i in [1, 2, 3, 4, 5, 6, 7]"
			v-if="state.blogs.length == 0"
		/>
		<TransitionGroup name="list" v-else>
			<Card
				v-for="(blog, index) in filteredBlogs"
				@handelFilterBy="handelFilterBy"
				:blog="blog"
				:key="index"
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
		</TransitionGroup>
	</ul>
	<button className="btn btn-primary">Load More</button>
</template>

<script setup lang="ts">
import Card from "@/components/Card.vue";
import SkeletonVue from "@/components/Skeleton.vue";
import SearchForm from "@/components/SearchForm.vue";
import { onMounted } from "vue";
import { ref, reactive, computed } from "vue";

const state = reactive({
	blogs: [],
	pages: 1,
	token: localStorage.token,
	ServerURL: import.meta.env.VITE_SERVER_URL,
	error: false,
});

const filterBy = ref("");
const handelFilterBy = (tag: string) => (filterBy.value = tag);
const filteredBlogs = computed(() => {
	if (filterBy.value)
		return state.blogs.filter((blog) =>
			blog.categories.includes(filterBy.value)
		);
	return state.blogs;
});

onMounted(() => {
	fetch(state.ServerURL + "/blogs", {
		headers: { authorization: state.token },
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.err) return;
			state.blogs = data.blogs;
			state.pages = Math.ceil(data.pages);
		})
		.catch((err) => {
			console.log(err);
			state.error = true;
			return;
		});
});
</script>
<style>
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
