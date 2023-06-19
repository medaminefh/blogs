<template>
	<span
		:class="classes[category] ? classes[category] : 'badge bg-dark text-light'"
	>
		<span className="text-secondary">#</span>
		{{ category }}
	</span>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ category: string }>(), {
	category: "",
});
const category = props.category.toLowerCase();
const classes = {
	html: "badge bg-danger text-light",
	css: "badge bg-primary text-light",
	javascript: "badge bg-JsYellow text-dark",
	github: "badge bg-dark text-light",
	reactjs: "badge bg-ReactBlue text-dark",
	python: "badge bg-lightBlue text-dark",
	python3: "badge bg-darkBlue text-light",
	programming: "badge bg-pistach text-dark",
	nodejs: "badge bg-darkGreen text-light",
	express: "badge bg-darkPurple text-light",
};
</script>
