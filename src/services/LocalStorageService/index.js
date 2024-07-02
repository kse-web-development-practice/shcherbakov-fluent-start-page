class LocalStorageService {
	static get APP_DATA_KEY() {
		return 'app';
	}

	static getAppData() {
		return JSON.parse(localStorage.getItem(this.APP_DATA_KEY));
	}

	static setAppData(data) {
		localStorage.setItem(this.APP_DATA_KEY, JSON.stringify(data));
	}

	static clearAppData() {
		localStorage.removeItem(this.APP_DATA_KEY);
	}
}

export default LocalStorageService;
