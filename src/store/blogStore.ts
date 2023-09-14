import { IBlog } from "@/types";
import { defineStore } from "pinia";

export const useBlogStore = defineStore("blog", {
	state: () => ({ blog: null as IBlog | null, loading: false }),
	actions: {
		async fetchBlog(id: string) {
			try {
				this.blog = null;
				this.loading = true;
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
				this.loading = false;
			} catch (error) {
				this.loading = false;
				console.log({ error });
			}
		},
	},
});
