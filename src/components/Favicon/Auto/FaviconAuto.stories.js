import FaviconAuto from '.';

export default {
	title: 'Favicon/Auto',
	component: FaviconAuto,
	argTypes: {
		websiteUrl: {
			control: 'text'
		}
	}
};

export const WebsiteExists = {
	args: {
		websiteUrl: 'https://kse-nmt.com'
	}
};

export const WebsiteNotExists = {
	args: {
		websiteUrl: 'https://iahgiushfgsiufg.ua'
	}
};
