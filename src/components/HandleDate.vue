<template>
	<div class="post-date">
		<span>{{ updatedAt }}</span>
		<span class="ms-5"> <i class="far fa-eye me-1"></i> {{ counter }} </span>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{ UpdatedAt: string; counter: number }>(),
	{
		UpdatedAt: "",
		counter: 0,
	}
);

const updatedAtDateObj = new Date(props.UpdatedAt);
const options = { year: "numeric", month: "short", day: "numeric" };
const updatedAt = updatedAtDateObj.toLocaleDateString("en-US", options);
</script>
