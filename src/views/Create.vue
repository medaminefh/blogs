<script setup lang="ts">
import HandleBadges from "@/components/HandleBadges.vue";
import "easymde/dist/easymde.min.css";
import { reactive, watch } from "vue";

const state = reactive({
	title: "",
	short: "",
	img: "",
	categories: [] as string[],
	long: "# this is a test",
	private: false,
	tag: "",
});

const handelDeleteTag = (category: string) => {
	const newCategories = state.categories.filter((cat) => cat !== category);
	state.categories = newCategories;
	console.log({ newCategories, state: state.categories });
};

const handleSubmit = (e: Event) => {
	e.preventDefault();
	console.log({ state });
};

watch(
	() => state.tag,
	(newValue) => {
		if (newValue !== " " || newValue !== ", ") {
			if (newValue.endsWith(",") || newValue.endsWith(" ")) {
				const newTag = newValue.slice(0, -1).toLocaleLowerCase();
				if (!state.categories.includes(newTag)) {
					state.categories = [...state.categories, newTag];
				}
				state.tag = "";
			}
		}
	}
);
</script>
<template>
	<RouterLink
		to="/"
		class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-4xl py-2 px-4"
	>
		←
	</RouterLink>
	<form @submit="handleSubmit" class="mt-6">
		<div class="relative z-0 w-full mb-8 group">
			<input
				type="text"
				name="title"
				id="title"
				class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
				v-model="state.title"
				required
			/>
			<label
				for="title"
				class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>Title</label
			>
		</div>
		<div class="relative z-0 w-full mb-8 group">
			<input
				type="text"
				name="short"
				id="short"
				class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
				v-model="state.short"
				required
			/>
			<label
				for="short"
				class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>Short description</label
			>
		</div>
		<div class="relative z-0 w-full mb-8 group">
			<input
				type="text"
				name="img"
				id="img"
				class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
				v-model="state.img"
				required
			/>
			<label
				for="img"
				class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>Img url</label
			>
		</div>

		<div class="flex space-x-2 mb-4">
			<HandleBadges
				v-for="(cat, index) in state.categories"
				:key="index"
				class="cursor-pointer"
				@click="() => handelDeleteTag(cat)"
				:category="cat"
			/>
		</div>

		<div class="relative z-0 w-full mb-8 group">
			<input
				type="text"
				name="tag"
				id="tag"
				class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
				v-model="state.tag"
			/>
			<label
				for="tag"
				class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>Tag</label
			>
		</div>

		<div class="flex items-center mb-4">
			<input
				id="private"
				type="checkbox"
				v-model="state.private"
				class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
			/>
			<label for="private" class="ml-2 text-sm font-medium text-gray-900"
				>Private</label
			>
		</div>

		<vue-easymde v-model="state.long" />
		<button
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			Submit
		</button>
	</form>
</template>
