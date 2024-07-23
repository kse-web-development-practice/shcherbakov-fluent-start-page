import * as AppDataStorage from '.';

// In jest.config.js, the testEnvironment is set to jsdom
// meaning that we can ignore creating a mock localStorage object
describe('App Data Storage Service', () => {
	describe('getAppData', () => {
		it('should return stored app data', () => {
			const data = { foo: 'bar' };
			const expectedOutput = JSON.stringify(data);

			localStorage.setItem(AppDataStorage.APP_DATA_KEY, expectedOutput);

			const result = AppDataStorage.getAppData();
			expect(result).toEqual(data);
		});
	});

	describe('setAppData', () => {
		it('should new set app data in localStorage', () => {
			const data = { foo: 'bar' };
			AppDataStorage.setAppData(data);

			const storedData = JSON.parse(localStorage.getItem(AppDataStorage.APP_DATA_KEY));
			expect(storedData).toEqual(data);
		});
	});

	describe('clearAppData', () => {
		it('should clear all stored application data', () => {
			const data = { foo: 'bar' };
			AppDataStorage.setAppData(data);
			expect(localStorage.getItem(AppDataStorage.APP_DATA_KEY)).not.toBeNull();

			AppDataStorage.clearAppData();
			expect(localStorage.getItem(AppDataStorage.APP_DATA_KEY)).toBeNull();
		});
	});
});
