export const isAuthenticated = () => {
	const token = localStorage.getItem("token");
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
