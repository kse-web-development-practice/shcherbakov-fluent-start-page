import UrlService from '../../../../services/UrlService';
import useCorsProxy from './useCorsProxy';

const getFaviconFromWebsite = (url, faviconFileName) => {
	const { fixCorsError } = useCorsProxy();
	const faviconUrl = fixCorsError(UrlService.combine(url, `/${faviconFileName}`));

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
};

const getFaviconWithDuckDuckGo = (url) => {
	const { fixCorsError } = useCorsProxy();
	const faviconUrl = fixCorsError(`https://external-content.duckduckgo.com/ip3/${UrlService.getHost(url)}.ico`);

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
};

// https://developer.chrome.com/docs/extensions/how-to/ui/favicons
// To make the website's favicon show properly, the user should visit the website at least once
const getFaviconWithChromeExtensionApi = (url, size = 64) => {
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
};

export default () => ({ getFaviconFromWebsite, getFaviconWithDuckDuckGo, getFaviconWithChromeExtensionApi });
