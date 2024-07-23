import * as AppDataStorage from '.';

describe('App Data Storage Service', () => {
	beforeEach(() => {
		Storage.prototype.getItem = jest.fn();
		Storage.prototype.setItem = jest.fn();
		Storage.prototype.removeItem = jest.fn();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('getAppData', () => {
		it('should return stored app data from AppDataStorage.APP_DATA_KEY', () => {
			const data = { foo: 'bar' };
			const expectedOutput = JSON.stringify(data);
			localStorage.getItem.mockReturnValue(expectedOutput);

			const result = AppDataStorage.getAppData();
			expect(localStorage.getItem).toHaveBeenCalledWith(AppDataStorage.APP_DATA_KEY);
			expect(result).toEqual(data);
		});
	});

	describe('setAppData', () => {
		it('should new set app data in localStorage', () => {
			const data = { foo: 'bar' };
			AppDataStorage.setAppData(data);
			expect(localStorage.setItem).toHaveBeenCalledWith(AppDataStorage.APP_DATA_KEY, JSON.stringify(data));
		});
	});

	describe('clearAppData', () => {
		it('should clear all stored application data', () => {
			AppDataStorage.clearAppData();
			expect(localStorage.removeItem).toHaveBeenCalledWith(AppDataStorage.APP_DATA_KEY);
		});
	});
});
