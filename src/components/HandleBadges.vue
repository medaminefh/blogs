<template>
	<span
		:class="[
			classes[category]
				? classes[category]
				: 'bg-gray-400 text-gray-800 border-gray-400',
			'text-sm font-medium px-2.5 py-0.5 rounded border',
		]"
	>
		<span className="text-secondary">#</span>
		{{ category }}
	</span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ category: string }>(), {
	category: "html",
});
const category = props.category.toLowerCase();
const classes = {
	html: "bg-red-100 text-red-800 border-red-400",
	css: "bg-blue-100 text-blue-800 border-blue-400",
	linux: "bg-blue-400 text-white border-gray-400",
	ubuntu: "bg-purple-400 text-white border-gray-400",
	django: "bg-emerald-400 text-emerald-800 border-gray-400",
	javascript: "bg-yellow-100 text-yellow-800 border-yellow-400",
	github: "bg-dark-100 text-dark-800 border-dark-400",
	reactjs: "bg-blue-400 text-blue-800 border-blue-400",
	python: "bg-blue-300 text-blue-800 border-blue-400",
	python3: "bg-blue-300 text-blue-800 border-blue-800",
	programming: "bg-gray-300 text-gray-800 border-white",
	nodejs: "bg-green-300 text-green-800 border-green-800",
	express: "bg-purple-400 text-purple-800 border-purple-800",
};
</script>
