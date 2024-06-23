import FaviconAuto from '.';

export default {
	title: 'Favicon/Auto',
	component: FaviconAuto,
	argTypes: {
		url: {
			control: 'text'
		}
	}
};

export const WebsiteExists = {
	args: {
		url: 'https://kse-nmt.com'
	}
};

export const WebsiteNotExists = {
	args: {
		url: 'https://iahgiushfgsiufg.ua'
	}
};
