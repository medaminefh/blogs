<template>
	<div class="d-flex justify-content-between">
		<Router-link to="/" class="btn btn-back"> Go Back </Router-link>
	</div>
	<div v-if="blog" className="card card-page">
		<HandleDate :updatedAt="blog.updatedAt" :counter="blog.counter" />
		<div className="post-body">
			<div v-html="marked.parse(blog.long)" />
		</div>
	</div>

	<div
		v-else
		role="status"
		class="space-y-2.5 animate-pulse w-full lg:h-96 h-[h-screen - 200px]"
	>
		<div class="flex items-center w-full space-x-2">
			<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
		</div>
		<div class="flex items-center w-full space-x-2 max-w-[480px]">
			<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
		</div>
		<div class="flex items-center w-full space-x-2 max-w-[400px]">
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
			<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
		</div>
		<div class="flex items-center w-full space-x-2 max-w-[480px]">
			<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
		</div>
		<div class="flex items-center w-full space-x-2 max-w-[440px]">
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
			<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
		</div>
		<div class="flex items-center w-full space-x-2 max-w-[360px]">
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
			<div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
			<div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
		</div>
		<span class="sr-only">Loading...</span>
	</div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useBlogStore } from "@/store/blogStore";
import { onMounted, ref, watch } from "vue";
import { marked } from "marked";
import HandleDate from "@/components/HandleDate.vue";
import { IBlog } from "@/types";

const route = useRoute();
const blog = ref<IBlog | null>(null);
const blogStore = useBlogStore();

onMounted(() => {
	blogStore.fetchBlog(route.params.id as string);
});

watch(
	() => blogStore.blog,
	(newValue) => {
		blog.value = newValue;
	}
);
</script>
