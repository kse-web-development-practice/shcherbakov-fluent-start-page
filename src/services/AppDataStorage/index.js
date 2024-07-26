export const APP_DATA_KEY = 'app';

export const getAppData = () => JSON.parse(localStorage.getItem(APP_DATA_KEY));

export const setAppData = (data) => {
	localStorage.setItem(APP_DATA_KEY, JSON.stringify(data));
};

export const clearAppData = () => {
	localStorage.removeItem(APP_DATA_KEY);
};
