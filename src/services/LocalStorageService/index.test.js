import LocalStorageService from '.';

describe('LocalStorage Service', () => {
	beforeEach(() => {
		Storage.prototype.getItem = jest.fn();
		Storage.prototype.setItem = jest.fn();
		Storage.prototype.removeItem = jest.fn();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('getAppData', () => {
		it('should return stored app data from LocalStorageService.APP_DATA_KEY', () => {
			const data = { foo: 'bar' };
			const expectedOutput = JSON.stringify(data);
			localStorage.getItem.mockReturnValue(expectedOutput);

			const result = LocalStorageService.getAppData();
			expect(localStorage.getItem).toHaveBeenCalledWith(LocalStorageService.APP_DATA_KEY);
			expect(result).toEqual(data);
		});
	});

	describe('setAppData', () => {
		it('should new set app data in localStorage', () => {
			const data = { foo: 'bar' };
			LocalStorageService.setAppData(data);
			expect(localStorage.setItem).toHaveBeenCalledWith(LocalStorageService.APP_DATA_KEY, JSON.stringify(data));
		});
	});

	describe('clearAppData', () => {
		it('should clear all stored application data', () => {
			LocalStorageService.clearAppData();
			expect(localStorage.removeItem).toHaveBeenCalledWith(LocalStorageService.APP_DATA_KEY);
		});
	});
});
