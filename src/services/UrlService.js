class UrlService {
	static getOrigin(url) {
		return new URL(url).origin;
	}

	static getHost(url) {
		return new URL(url).host;
	}

	static combine(url1, url2) {
		return new URL(url2, this.getOrigin(url1));
	}
}

export default UrlService;
