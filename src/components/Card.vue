<template>
	<div class="card">
		<HandleDate :updatedAt="blog.updatedAt" />

		<h3 class="flex justify-between items-center gap-x-3">
			<span>
				{{ blog.title }}
			</span>

			<span v-if="token && blog.private == 'true'" className="text-xl">
				🌚
			</span>
		</h3>

		<p>{{ blog.short }}</p>
		<img v-if="blog.img_url" :src="blog.img_url" :alt="blog.title" />

		<div class="flex flex-wrap my-4 gap-2">
			<div
				v-for="category in blog.categories"
				class="cursor-pointer"
				:key="Math.random() * 60000"
			>
				<HandleBadges :category="category" @click="handelClick(category)" />
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
import { IBlog } from "@/types";

interface Props {
	blog: IBlog;
}

defineProps<Props>();

const emits = defineEmits<{
	(e: "handelFilterBy", tag: string): void;
}>();

const token = localStorage.getItem("token");

const handelClick = (tag: string) => {
	emits("handelFilterBy", tag);
};
</script>
