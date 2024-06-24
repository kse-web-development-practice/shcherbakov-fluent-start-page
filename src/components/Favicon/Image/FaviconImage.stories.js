import FaviconIcon from '.';

export default {
	title: 'Favicon/Image',
	component: FaviconIcon,
	argTypes: {
		url: {
			control: 'text'
		}
	}
};

export const NoUrl = {
	args: {}
};

export const ImageNotExists = {
	args: {
		url: 'https://sudghsodifgu.ua/favicon.ico'
	}
};

export const ValidUrl = {
	args: {
		url: 'https://www.google.com/favicon.ico'
	}
};
