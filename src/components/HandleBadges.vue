<template>
	<span
		:class="[
			classes[category]
				? classes[category]
				: 'bg-gray-100 text-gray-800 border-gray-400',
			'text-sm font-medium px-2.5 py-0.5 rounded border',
		]"
	>
		<span className="text-secondary">#</span>
		{{ category }}
	</span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ category: keyof typeof classes }>(), {
	category: "html",
});
const category = props.category.toLowerCase();
const classes = {
	html: "bg-red-100 text-red-800 border-red-400",
	css: "bg-blue-100 text-blue-800 border-blue-400",
	javascript: "bg-yellow-100 text-yellow-800 border-yellow-400",
	github: "bg-dark-100 text-dark-800 border-dark-400",
	reactjs: "bg-blue-400 text-blue-800 border-blue-400",
	python: "badge bg-lightBlue text-dark",
	python3: "badge bg-darkBlue text-light",
	programming: "badge bg-pistach text-dark",
	nodejs: "badge bg-darkGreen text-light",
	express: "badge bg-darkPurple text-light",
};
</script>
