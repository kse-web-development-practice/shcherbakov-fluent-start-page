import FaviconText from '.';

export default {
	title: 'Favicon/Text',
	component: FaviconText,
	argTypes: {
		text: {
			control: 'text'
		}
	}
};

export const SomeText = {
	args: {
		text: 'Hello world!'
	}
};

export const Empty = {
	args: {}
};
