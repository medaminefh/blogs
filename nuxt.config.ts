// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: false },
	plugins: ["~/plugins/vue3-google-login.ts"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	runtimeConfig: {
		// Private keys are only available on the server
		apiSecret: "123",

		// Public keys that are exposed to the client
		public: {
			SERVER_URL: process.env.NUXT_SERVER_URL,
			GOOGLE_CLIENT_ID: process.env.NUXT_GOOGLE_CLIENT_ID,
			LOGIN_URL: process.env.NUXT_LOGIN_URL,
		},
	},
});
