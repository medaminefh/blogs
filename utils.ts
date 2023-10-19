export const isAuthenticated = () => {
	const token =
		typeof window !== "undefined" ? localStorage.getItem("token") : null;
	if (token) return token;
	return false;
};

export function debounce(func, timeout = 300) {
	let timer;
	return (...args) => {
		if (!timer) {
			func.apply(this, args);
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			timer = undefined;
		}, timeout);
	};
}
