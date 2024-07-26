export const getUrlWithProtocol = (url) => {
	return url.startsWith('http') ? url : `https://${url}`;
};

export const isUrlValid = (url) => {
	try {
		return Boolean(new URL(getUrlWithProtocol(url)));
	} catch (e) {
		return false;
	}
};

export const getUrlOrigin = (url) => new URL(getUrlWithProtocol(url)).origin;

export const getUrlHost = (url) => new URL(getUrlWithProtocol(url)).host;

export const combineUrls = (url1, url2) => new URL(url2, getUrlOrigin(url1));
