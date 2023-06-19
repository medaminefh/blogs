<template>
	<div class="card">
		<HandleDate :UpdatedAt="updatedAt" />

		<h3>{{ title }}</h3>

		<p>{{ short }}</p>
		<img v-if="img_url" :src="img_url" :alt="title" />

		<div class="d-flex flex-wrap justify-content-around mt-2 mb-2">
			<div
				v-for="category in categories"
				style="cursor: 'pointer'"
				:key="Math.random() * 60000"
			>
				<HandleBadges :category="category" />
			</div>
		</div>

		<RouterLink :to="`/blog/${id}`" class="btn"> read More </RouterLink>
	</div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import HandleBadges from "@/components/HandleBadges.vue";
import HandleDate from "@/components/HandleDate.vue";

interface Props {
	id: number;
	img_url: string;
	categories: string;
	nonPublic: boolean;
	updatedAt: string;
	short: string;
	title: string;
	setFilter: string;
	handleDate: string;
}

withDefaults(defineProps<Props>(), {
	id: 0,
	img_url: "",
	categories: "",
	nonPublic: true,
	updatedAt: "",
	short: "",
	title: "",
	setFilter: "",
	handleDate: "",
});
</script>
