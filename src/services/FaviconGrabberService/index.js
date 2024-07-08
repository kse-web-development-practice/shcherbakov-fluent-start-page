import UrlService from '../UrlService';

class FaviconGrabberService {
	/**
	 * Returns a URL wrapped into a proxy
	 * to fix a CORS error while doing a request to any website
	 * @param {string} url
	 */
	static #fixCorsError(url) {
		return `https://corsproxy.io/?${encodeURIComponent(url)}`;
	}

	/**
	 * Does a request to a favicon
	 * and checks if it exists by response status
	 * @param {string} url Website URL
	 * @param {string} faviconFileName
	 * @returns {Promise<string>} A full favicon URL if it exists and otherwise rejects
	 */
	static getFromWebsite(url, faviconFileName) {
		const faviconUrl = this.#fixCorsError(UrlService.combine(url, `/${faviconFileName}`));

		return new Promise((resolve, reject) => {
			fetch(faviconUrl)
				.then(({ status }) => {
					if (status !== 200) {
						reject();
						return;
					}
					resolve(faviconUrl);
				})
				.catch(reject);
		});
	}

	/**
	 * A shorthand for getFaviconFromWebsite
	 * to retrieve a website favicon from DuckDuckGo's cache
	 * @param {string} url
	 */
	static getWithDuckDuckGo(url) {
		return this.getFromWebsite(`https://external-content.duckduckgo.com`, `ip3/${UrlService.getHost(url)}.ico`);
	}

	/**
	 * https://developer.chrome.com/docs/extensions/how-to/ui/favicons
	 * To make favicon show properly, the user should visit a website at least once
	 * @param {string} url
	 * @param {number} size
	 * @returns {string} Google Chrome's extension URL to a website favicon
	 */
	static getWithChromeExtensionApi(url, size = 64) {
		return new Promise((resolve, reject) => {
			if (!window.chrome || !chrome.runtime || !chrome.runtime.id) {
				reject();
				return;
			}

			const result = new URL(chrome.runtime.getURL('/_favicon/'));
			result.searchParams.set('pageUrl', url);
			result.searchParams.set('size', size);

			resolve(result.toString());
		});
	}

	static tryAllPossibleCases(websiteUrl) {
		return Promise.any([
			this.getWithChromeExtensionApi(websiteUrl),
			this.getWithDuckDuckGo(websiteUrl),

			this.getFromWebsite(websiteUrl, 'favicon.ico'),
			this.getFromWebsite(websiteUrl, 'favicon.svg'),
			this.getFromWebsite(websiteUrl, 'apple-touch-icon.png'),
			this.getFromWebsite(websiteUrl, 'favicon-32x32.png'),
			this.getFromWebsite(websiteUrl, 'favicon-48x48.png'),
			this.getFromWebsite(websiteUrl, 'favicon-64x64.png'),
			this.getFromWebsite(websiteUrl, 'favicon-167x167.png'),
			this.getFromWebsite(websiteUrl, 'favicon-180x180.png'),
			this.getFromWebsite(websiteUrl, 'favicon-192x192.png')
		]);
	}
}

export default FaviconGrabberService;
