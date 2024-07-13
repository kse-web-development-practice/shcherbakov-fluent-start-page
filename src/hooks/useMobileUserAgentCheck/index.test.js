import useMobileUserAgentCheck from '.';

const userAgents = [
	{
		name: 'Windows Chrome',
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.3',
		isMobile: false
	},
	{
		name: 'MacOS Safari',
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.1',
		isMobile: false
	},
	{
		name: 'Windows Firefox',
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.',
		isMobile: false
	},
	{
		name: 'Linux Samsung Internet',
		userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/25.0 Chrome/121.0.0.0 Safari/537.3',
		isMobile: false
	},
	{
		name: 'Android Chrome',
		userAgent: 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.3',
		isMobile: true
	},
	{
		name: 'iOS Safari',
		userAgent:
			'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.',
		isMobile: true
	},
	{
		name: 'iOS Firefox',
		userAgent:
			'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/126.2  Mobile/15E148 Safari/605.1.1',
		isMobile: true
	}
];

describe('useMobileUserAgentCheck', () => {
	describe.each(userAgents)('test for $name', (item) => {
		const { userAgent: originalUserAgent } = window.navigator;

		beforeEach(() => {
			Object.defineProperty(window, 'navigator', {
				configurable: true,
				writable: true,
				value: {
					userAgent: item.userAgent
				}
			});
		});

		afterEach(() => {
			Object.defineProperty(window, 'navigator', {
				configurable: true,
				value: originalUserAgent
			});
		});

		it(`returns ${item.isMobile}`, () => {
			expect(useMobileUserAgentCheck()).toBe(item.isMobile);
		});
	});
});
