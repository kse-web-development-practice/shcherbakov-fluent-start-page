class UrlService {
	static getUrlWithProtocol(url) {
		return url.startsWith('http') ? url : `https://${url}`;
	}

	static isValid(url) {
		try {
			return Boolean(new URL(this.getUrlWithProtocol(url)));
		} catch (e) {
			return false;
		}
	}

	static getOrigin(url) {
		return new URL(this.getUrlWithProtocol(url)).origin;
	}

	static getHost(url) {
		return new URL(this.getUrlWithProtocol(url)).host;
	}

	static combine(url1, url2) {
		return new URL(url2, this.getOrigin(url1));
	}
}

export default UrlService;
