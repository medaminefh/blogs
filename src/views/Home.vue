<template>
	<h2>Home page</h2>
	<vue-easymde v-model="test" ref="editorInstance" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const test = ref("initial value");
</script>
