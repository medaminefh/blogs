import { defineStore } from "pinia";

export const useBlogStore = defineStore("blog", {
	state: () => ({ blog: null }),
	actions: {
		async fetchBlog(id: string) {
			try {
				const token = localStorage.getItem("token") as string;
				const res = await fetch(
					import.meta.env.VITE_SERVER_URL + `/blogs/${id}`,
					{
						method: "GET",
						headers: {
							"content-type": "application/json",
							authorization: token,
						},
					}
				);

				const data = await res.json();
				if (data.err) return;
				this.blog = data;
			} catch (error) {
				console.log({ error });
			}
		},
	},
});
