import Favicon from './index';
import FaviconIconStories from './Icon/FaviconIcon.stories';
import FaviconAutoStories from './Auto/FaviconAuto.stories';

const insertObjectIntoEachSubObject = (source, addition) =>
	Object.fromEntries(Object.entries(source).map(([key, value]) => [key, { ...value, ...addition }]));

export default {
	title: 'Favicon',
	component: Favicon,
	argTypes: {
		type: {
			control: 'select',
			options: ['none', 'image', 'text', 'icon', 'auto', null]
		},
		...insertObjectIntoEachSubObject(FaviconIconStories.argTypes, { if: { arg: 'type', eq: 'icon' } }),
		...insertObjectIntoEachSubObject(FaviconAutoStories.argTypes, { if: { arg: 'type', eq: 'auto' } })
	}
};

export const Wrapper = {
	args: {
		type: 'icon',
		iconStyle: 'fas',
		name: 'cog'
	}
};
