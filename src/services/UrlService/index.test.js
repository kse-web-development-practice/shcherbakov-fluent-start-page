import UrlService from '.';

describe('URL Service', () => {
	const invalidUrlError = new TypeError('Invalid URL: https://');

	describe('getUrlWithProtocol', () => {
		describe('if URL begins with http', () => {
			it('should return the same string', () => {
				expect(UrlService.getUrlWithProtocol('http://localhost')).toEqual('http://localhost');
				expect(UrlService.getUrlWithProtocol('https://localhost')).toEqual('https://localhost');
			});
		});

		describe('if URL does not begin with http', () => {
			it('should return a string with "https://" prefix', () => {
				expect(UrlService.getUrlWithProtocol('localhost')).toEqual('https://localhost');
			});
		});

		describe('if URL is not a string', () => {
			it('should throw an error', () => {
				[undefined, null, 0].forEach((input) => {
					expect(() => {
						UrlService.getUrlWithProtocol(input);
					}).toThrow(Error);
				});
			});
		});
	});

	describe('isValid', () => {
		describe('if URL is valid', () => {
			describe('if URL has protocol specified', () => {
				it('should return true', () => {
					expect(UrlService.isValid('https://google.com/')).toBeTruthy();
				});
			});

			describe('if URL has not protocol specified', () => {
				it('should return true', () => {
					expect(UrlService.isValid('google.com')).toBeTruthy();
				});
			});
		});

		describe('if URL is invalid', () => {
			it('should return false', () => {
				[undefined, null, 0, ''].forEach((input) => expect(input).toBeFalsy());
			});
		});
	});

	describe('getOrigin', () => {
		describe('if URL is valid (https://google.com/lolololo)', () => {
			it('should return https://google.com', () => {
				expect(UrlService.getOrigin('https://google.com/lolololo')).toEqual('https://google.com');
			});
		});

		describe('if URL is not a string', () => {
			it('should throw an error', () => {
				expect(() => {
					UrlService.getOrigin();
				}).toThrow(Error);
			});
		});

		describe('if URL is invalid', () => {
			it('should throw a TypeError', () => {
				expect(() => {
					UrlService.getOrigin('');
				}).toThrow(invalidUrlError);
			});
		});
	});

	describe('getHost', () => {
		describe('if URL is valid (https://example.com/ahaha)', () => {
			it('should return example.com', () => {
				expect(UrlService.getHost('https://example.com/ahaha')).toEqual('example.com');
			});
		});

		describe('if URL is not a string', () => {
			it('should throw an error', () => {
				expect(() => {
					UrlService.getHost();
				}).toThrow(Error);
			});
		});

		describe('if URL is invalid', () => {
			it('should throw a TypeError', () => {
				expect(() => {
					UrlService.getHost('');
				}).toThrow(invalidUrlError);
			});
		});
	});

	describe('combine', () => {
		describe('if all of inputs are valid (localhost, endpoint/ahaha)', () => {
			it('should return https://localhost/endpoint/ahaha', () => {
				expect(UrlService.combine('localhost', 'endpoint/ahaha').href).toEqual('https://localhost/endpoint/ahaha');
			});
		});

		describe('if base URL is not a string', () => {
			it('should throw an error', () => {
				expect(() => {
					UrlService.combine(null, 'endpoint/ahaha');
				}).toThrow(Error);
			});
		});

		describe('if base URL is not valid', () => {
			it('should throw a TypeError', () => {
				expect(() => {
					UrlService.combine('', 'endpoint/ahaha');
				}).toThrow(invalidUrlError);
			});
		});
	});
});
