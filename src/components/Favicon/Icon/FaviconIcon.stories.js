import FaviconIcon from '.';

export default {
	title: 'Favicon/Icon',
	component: FaviconIcon,
	argTypes: {
		iconStyle: {
			control: 'select',
			options: ['fas', 'fab']
		},
		name: {
			control: 'text'
		}
	}
};

export const Solid = {
	args: {
		iconStyle: 'fas',
		name: 'cog'
	}
};

export const Brand = {
	args: {
		iconStyle: 'fab',
		name: 'github'
	}
};

export const Stylized = {
	args: {
		iconStyle: 'fas',
		name: 'bolt',
		size: '4x',
		beatFade: true,
		style: {
			color: 'yellow',
			filter: 'drop-shadow(0 0 2px orange)'
		}
	}
};
