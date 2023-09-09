<template>
	<div class="card">
		<HandleDate :updatedAt="blog.updatedAt" />

		<h3>{{ blog.title }}</h3>

		<p>{{ blog.short }}</p>
		<img v-if="blog.img_url" :src="blog.img_url" :alt="blog.title" />

		<div class="d-flex flex-wrap justify-content-around mt-2 mb-2">
			<div
				v-for="category in blog.categories"
				style="cursor: 'pointer'"
				:key="Math.random() * 60000"
			>
				<HandleBadges
					:category="category"
					@handelFilterBy="(e) => $emit('handelFilterBy', e)"
				/>
			</div>
		</div>

		<RouterLink :to="{ name: 'Blog', params: { id: blog._id } }" class="btn">
			read More
		</RouterLink>
	</div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import HandleBadges from "@/components/HandleBadges.vue";
import HandleDate from "@/components/HandleDate.vue";

interface Blog {
	_id: string;
	updatedAt: string;
	categories: string[];
	long: string;
	short: string;
	title: string;
	img_url: string;
}

interface Props {
	blog: Blog;
}

withDefaults(defineProps<Props>(), {
	blog: {
		_id: "",
		updatedAt: "",
		categories: [],
		long: "",
		short: "",
		title: "",
		img_url: "",
	},
});

defineEmits<{
	(e: "handelFilterBy", tag: string): void;
}>();
</script>
