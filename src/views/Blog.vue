<template>
	<div>{{ error || success }}</div>
	<div class="flex justify-between items-center">
		<RouterLink
			to="/"
			class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-4xl px-4 mb-5 rounded"
		>
			←
		</RouterLink>
		<div class="flex space-x-4" v-if="token && blog">
			<button
				@click="handelDeleteBlog"
				class="mb-5 cursor-pointer border border-gray-400 hover:scale-95 text-gray-800 py-2 px-4 bg-red-500 rounded"
			>
				Delete
			</button>
			<button @click="edit = !edit" class="btn btn-back">
				{{ edit ? "X" : "Edit" }}
			</button>
		</div>
	</div>
	<div v-if="blog && !edit" className="card card-page">
		<HandleDate :updatedAt="blog.updatedAt" :counter="blog.counter" />
		<div className="post-body">
			<div class="overflow-scroll" v-html="marked.parse(blog.long)" />
		</div>
	</div>
	<div v-if="blog && edit">
		<form @submit.prevent="handleSubmit" class="mt-6">
			<div class="relative z-0 w-full mb-8 group">
				<input
					type="text"
					name="title"
					id="title"
					class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					v-model="blog.title"
					required
				/>
				<label
					for="title"
					class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
					v-model="blog.short"
					required
				/>
				<label
					for="short"
					class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>Short description</label
				>
			</div>
			<div class="relative z-0 w-full mb-8 group">
				<input
					type="text"
					name="img"
					id="img"
					class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					v-model="blog.img_url"
				/>
				<label
					for="img"
					class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>Img url</label
				>
			</div>

			<div class="flex space-x-2 mb-4">
				<HandleBadges
					v-for="cat in blog.categories"
					:key="cat"
					class="cursor-pointer"
					@click="handelDeleteTag(cat)"
					:category="cat"
				/>
			</div>

			<div class="relative z-0 w-full mb-8 group">
				<input
					type="text"
					name="tag"
					id="tag"
					class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=" "
					v-model="tag"
				/>
				<label
					for="tag"
					class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
					>Tag</label
				>
			</div>

			<div class="flex items-center mb-4">
				<input
					id="private"
					type="checkbox"
					v-model="blog.private"
					class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
				/>
				<label for="private" class="ml-2 text-sm font-medium text-gray-900"
					>Private</label
				>
			</div>

			<vue-easymde v-model="blog.long" />
			<button
				class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
			>
				Submit
			</button>
		</form>
	</div>
	<div
		v-if="!blog"
		role="status"
		class="space-y-2.5 animate-pulse w-full lg:h-96 h-[h-screen - 200px]"
	>
		<div class="flex items-center w-full space-x-2">
			<div class="h-2.5 bg-gray-200 rounded-full w-32"></div>
			<div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
			<div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
		</div>
		<div class="flex items-center w-full space-x-2 max-w-[480px]">
			<div class="h-2.5 bg-gray-200 rounded-full w-full"></div>
			<div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
			<div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
		</div>
		<div class="flex items-center w-full space-x-2 max-w-[400px]">
			<div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
			<div class="h-2.5 bg-gray-200 rounded-full w-80"></div>
			<div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
		</div>
		<div class="flex items-center w-full space-x-2 max-w-[480px]">
			<div class="h-2.5 bg-gray-200 rounded-full w-full"></div>
			<div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
			<div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
		</div>
		<div class="flex items-center w-full space-x-2 max-w-[440px]">
			<div class="h-2.5 bg-gray-300 rounded-full w-32"></div>
			<div class="h-2.5 bg-gray-300 rounded-full w-24"></div>
			<div class="h-2.5 bg-gray-200 rounded-full w-full"></div>
		</div>
		<div class="flex items-center w-full space-x-2 max-w-[360px]">
			<div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
			<div class="h-2.5 bg-gray-200 rounded-full w-80"></div>
			<div class="h-2.5 bg-gray-300 rounded-full w-full"></div>
		</div>
		<span class="sr-only">Loading...</span>
	</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useBlogStore } from "@/store/blogStore";
import { onMounted, ref, watch } from "vue";
import { marked } from "marked";
import HandleDate from "@/components/HandleDate.vue";
import { IBlog } from "@/types";
import HandleBadges from "@/components/HandleBadges.vue";

const route = useRoute();
const router = useRouter();
const token = localStorage.getItem("token");
const blog = ref<IBlog | null>(null);
const tag = ref("");
const blogStore = useBlogStore();
const edit = ref(false);
const error = ref(null);
const success = ref(null);

onMounted(() => {
	blogStore.fetchBlog(route.params.id as string);
});

const handelDeleteBlog = () => {
	const confirmation = window.confirm("Are You Sure You want To Delete This?");
	if (confirmation) {
		fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/${blog.value?._id}`, {
			method: "DELETE",
			headers: {
				"content-type": "application/json",
				authorization: token,
			} as HeadersInit,
		})
			.then((res) => res.json())
			.then((data) => {
				// show some Notification in the ui
				console.log(data);
				error.value = "";
				success.value = data.msg;
				router.push("/");
			})
			.catch((err) => {
				error.value = err;
				success.value = "";
			});
	}
};

const handelDeleteTag = (category: string) => {
	const newCategories = blog.value?.categories.filter(
		(cat) => cat !== category
	) as string[];
	(blog.value.categories = newCategories),
		console.log({ newCategories, state: blog.value });
};

const handleSubmit = (e: Event) => {
	e.preventDefault();
	error.value = "";
	success.value = "";
	if (
		!blog.value!.title ||
		!blog.value!.short ||
		!blog.value!.long ||
		!blog.value!.categories
	) {
		error.value = "Fill All the fields";
	}

	fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/${blog.value?._id}`, {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
			authorization: token as string,
		},
		body: JSON.stringify({
			title: blog.value?.title,
			img_url: blog.value?.img_url,
			short: blog.value?.short,
			long: blog.value?.long,
			categories: blog.value?.categories,
			private: blog.value?.private,
		}),
	})
		.then((res) => res.json())
		.then((data) => {
			// show some Notification in the ui
			if (data.err) {
				error.value = data.err;
				success.value = "";
				return;
			}
			error.value = "";
			success.value = data.msg;
			window.location.reload();
		})
		.catch((err) => {
			error.value = err;
			success.value = "";
			console.log(err);
		});
};

watch(
	() => [blogStore.blog, tag.value],
	([newValue1, newValue2]) => {
		if (newValue1) {
			blog.value = newValue1;
		}
		if (newValue2 as string) {
			if (newValue2 !== " " || newValue2 !== ", ") {
				if (newValue2.endsWith(",") || newValue2.endsWith(" ")) {
					const newTag = newValue2.slice(0, -1).toLocaleLowerCase();
					if (!blog.value.categories.includes(newTag)) {
						blog.value.categories = [...blog.value.categories, newTag];
					}
					tag.value = "";
				}
			}
		}
	}
);
</script>
