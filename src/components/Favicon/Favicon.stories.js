import React from 'react';
import Favicon from './index';
import FaviconIconStories from './Icon/FaviconIcon.stories';
import FaviconAutoStories from './Auto/FaviconAuto.stories';
import FaviconTextStories from './Text/FaviconText.stories';
import FaviconImageStories from './Image/FaviconImage.stories';

const insertObjectIntoEachSubObject = (source, addition) =>
	Object.fromEntries(Object.entries(source).map(([key, value]) => [key, { ...value, ...addition }]));

export default {
	title: 'Favicon',
	component: Favicon,
	decorators: [(Story, { args: { type, ...data } }) => <Favicon type={type} data={{ ...data }} />],
	argTypes: {
		type: {
			control: 'select',
			options: ['icon', 'auto', 'text', 'image', null]
		},
		data: {
			table: {
				disable: true
			}
		},
		...insertObjectIntoEachSubObject(FaviconIconStories.argTypes, { if: { arg: 'type', eq: 'icon' } }),
		...insertObjectIntoEachSubObject(FaviconAutoStories.argTypes, { if: { arg: 'type', eq: 'auto' } }),
		...insertObjectIntoEachSubObject(FaviconTextStories.argTypes, { if: { arg: 'type', eq: 'text' } }),
		...insertObjectIntoEachSubObject(FaviconImageStories.argTypes, { if: { arg: 'type', eq: 'image' } })
	}
};

export const Wrapper = {
	args: {
		type: 'icon',
		iconStyle: 'fas',
		name: 'cog'
	}
};
