<template>
	<div class="post-date">
		<span>{{ updatedAt }}</span>
		<span v-if="counter" class="ms-5">
			<span class="mr-1">👀</span>{{ counter }}
		</span>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{ updatedAt: string; counter?: number }>(),
	{
		updatedAt: "",
		counter: 0,
	}
);

const updatedAtDateObj = new Date(props.updatedAt);
const options = { year: "numeric", month: "short", day: "numeric" };
const updatedAt = updatedAtDateObj.toLocaleDateString(
	"en-US",
	options as Intl.DateTimeFormatOptions
);
</script>
