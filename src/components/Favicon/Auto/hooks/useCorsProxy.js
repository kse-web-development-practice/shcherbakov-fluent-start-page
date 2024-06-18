export const fixCorsError = (url) => {
	return `https://corsproxy.io/?${url}`;
};

export default () => ({ fixCorsError });
