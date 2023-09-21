<template>
	<NuxtLink
		to="/"
		class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-4xl px-4 mb-5 rounded"
	>
		←
	</NuxtLi>
	<div
		v-if="state.msg"
		class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
	>
		<div
			v-if="state.err"
			class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg"
		>
			<svg
				class="w-5 h-5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
				/>
			</svg>
			<span class="sr-only">Error icon</span>
		</div>
		<div
			v-else
			class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg"
		>
			<svg
				class="w-5 h-5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
				/>
			</svg>
			<span class="sr-only">Check icon</span>
		</div>
		<div class="ml-3 text-sm font-normal">{{ state.msg }}</div>
		<button
			@click="state.msg = ''"
			type="button"
			class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
		>
			<span class="sr-only">Close</span>
			<svg
				class="w-3 h-3"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 14 14"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
				/>
			</svg>
		</button>
	</div>
	<div
		class="container flex flex-col items-center justify-center h-[200px] space-y-4"
	>
		<h2>Admin page</h2>
		<GoogleLogin :callback="callback" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { googleOneTap } from "vue3-google-login";

const router = useRouter();
const state = reactive({
	msg: "",
	err: false,
});

const postData = async (respo: string) => {
	try {
		const res = await fetch(import.meta.env.VITE_LOGIN_URL, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ token: respo }),
		});

		return await res.json();
	} catch (error) {
		console.log("There is an error", error);
	}
};

const callback = async (response: any) => {
	const res = await postData(response.credential);
	state.msg = res.msg;
	if (res.token) {
		localStorage.token = res.token;
		state.err = false;
		router.back();
		return;
	} else {
		state.err = true;
	}
};

onMounted(() => {
	async function googleOneTapAsync() {
		try {
			const response = await googleOneTap();
			// This promise is resolved when the user selects an account from the One Tap prompt
			const res = await postData(response.credential);
			state.msg = res.msg;
			if (res.token) {
				localStorage.token = res.token;
				state.err = false;
				router.back();
				return;
			} else {
				state.err = true;
			}
		} catch (error) {
			console.log("Handle the error", error);
		}
	}

	// Call the async function
	googleOneTapAsync();
});
</script>
