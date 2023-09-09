<template>
	<h2>Blog page</h2>

	{{ blogStore.blog }}
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useBlogStore } from "@/store/blogStore";
import { onMounted } from "vue";

const route = useRoute();
const blogStore = useBlogStore();
onMounted(() => {
	blogStore.fetchBlog(route.params.id);
});
</script>
