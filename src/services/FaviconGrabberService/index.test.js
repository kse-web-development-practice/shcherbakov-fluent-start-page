import FaviconGrabberService from '.';

global.fetch = jest.fn();
global.chrome = {
	runtime: {
		id: 'extension-id',
		getURL: jest.fn((path) => `chrome-extension://${global.chrome.runtime.id}${path}`)
	}
};

describe('Favicon Grabber Service', () => {
	const url = 'https://example.com';
	const faviconFilename = 'favicon.ico';

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getFromWebsite', () => {
		describe('if output status is 200', () => {
			beforeEach(() => {
				fetch.mockResolvedValue({ status: 200 });
			});

			it('should resolve with the favicon URL via proxy', async () => {
				const result = FaviconGrabberService.getFromWebsite(url, faviconFilename);
				const expectedResolvedOutput = `https://corsproxy.io/?${encodeURIComponent(`${url}/${faviconFilename}`)}`;
				await expect(result).resolves.toEqual(expectedResolvedOutput);
			});
		});

		describe('if output status is not 200', () => {
			beforeEach(() => {
				fetch.mockResolvedValue({ status: 404 });
			});

			it('should reject', async () => {
				const result = FaviconGrabberService.getFromWebsite(url, faviconFilename);
				await expect(result).rejects.toBeUndefined();
			});
		});

		describe('if request threw an error', () => {
			beforeEach(() => {
				fetch.mockRejectedValue(new Error('Network error'));
			});

			it('should reject', async () => {
				const result = FaviconGrabberService.getFromWebsite(url, faviconFilename);
				await expect(result).rejects.toThrow('Network error');
			});
		});
	});

	describe('getWithDuckDuckGo', () => {
		beforeEach(() => {
			fetch.mockResolvedValue({ status: 200 });
		});

		it('should resolve with DuckDuckGo cache URL with proxy', async () => {
			const result = FaviconGrabberService.getWithDuckDuckGo(`${url}/${faviconFilename}`);
			const expectedResolvedOutput = `https://corsproxy.io/?${encodeURIComponent(`https://external-content.duckduckgo.com/ip3/${new URL(url).host}.ico`)}`;
			await expect(result).resolves.toEqual(expectedResolvedOutput);
		});
	});

	describe('getWithChromeExtensionApi', () => {
		describe('if runs as Chrome extension', () => {
			it('should resolve with the Chrome extension favicon URL', async () => {
				const result = FaviconGrabberService.getWithChromeExtensionApi(url);
				const expectedResolvedOutput = `chrome-extension://extension-id/_favicon/?pageUrl=${encodeURIComponent(url)}&size=64`;
				await expect(result).resolves.toEqual(expectedResolvedOutput);
			});
		});

		describe('if runs not as Chrome extension', () => {
			it('should reject', async () => {
				delete global.chrome;

				const result = FaviconGrabberService.getWithChromeExtensionApi(url);
				await expect(result).rejects.toBeUndefined();
			});
		});
	});

	describe('tryAllPossibleCases', () => {
		describe('if at least one case pass', () => {
			it('should resolve with the first successful favicon URL', async () => {
				jest.spyOn(FaviconGrabberService, 'getWithChromeExtensionApi').mockRejectedValue();
				jest.spyOn(FaviconGrabberService, 'getWithDuckDuckGo').mockResolvedValue('duckduckgo-favicon-url');
				jest.spyOn(FaviconGrabberService, 'getFromWebsite').mockResolvedValue('favicon-url');

				const result = FaviconGrabberService.tryAllPossibleCases(url);

				await expect(result).resolves.toEqual('duckduckgo-favicon-url');
			});
		});

		describe('if all cases fail', () => {
			it('should resolve with undefined', async () => {
				jest.spyOn(FaviconGrabberService, 'getWithChromeExtensionApi').mockRejectedValue();
				jest.spyOn(FaviconGrabberService, 'getWithDuckDuckGo').mockRejectedValue();
				jest.spyOn(FaviconGrabberService, 'getFromWebsite').mockRejectedValue();

				const result = FaviconGrabberService.tryAllPossibleCases(url);

				await expect(result).rejects.toThrow();
			});
		});
	});
});
