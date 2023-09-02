<template>
	<div class="post-date">
		<span>{{ updatedAt }}</span>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{ UpdatedAt: string; counter: number }>(),
	{
		UpdatedAt: "",
	}
);

const updatedAtDateObj = new Date(props.UpdatedAt);
const options = { year: "numeric", month: "short", day: "numeric" };
const updatedAt = updatedAtDateObj.toLocaleDateString(
	"en-US",
	options as Intl.DateTimeFormatOptions
);
</script>
