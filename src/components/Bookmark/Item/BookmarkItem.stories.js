import React from 'react';

import BookmarkGroup from '../Group';
import BookmarkItem from '.';

export default {
	title: 'Bookmark/Item',
	component: BookmarkItem,
	decorators: [
		(Story, { args }) => (
			<div style={{ width: 400 }}>
				<BookmarkGroup id="0" renderGroupHeader={null} bookmarks={[args]} />
			</div>
		)
	],
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs']
};

export const SmallBookmark = {
	args: {
		id: '0',
		link: '#',
		row: 0,
		column: 0,
		size: 'small',
		favicon: {
			type: 'icon',
			data: {
				iconStyle: 'fas',
				name: 'calculator'
			}
		}
	}
};

export const MediumBookmark = {
	args: {
		id: '0',
		link: '#',
		row: 0,
		column: 0,
		size: 'medium',
		text: 'Google',
		favicon: {
			type: 'image',
			data: {
				url: 'https://google.com/favicon.ico'
			}
		}
	}
};

export const WideBookmark = {
	args: {
		id: '0',
		link: '#',
		row: 0,
		column: 0,
		size: 'wide',
		favicon: {
			type: 'text',
			data: {
				text: 'Lorem ipsum dolor sit amet'
			}
		}
	}
};

export const LargeBookmark = {
	args: {
		id: '0',
		link: '#',
		row: 0,
		column: 0,
		size: 'large',
		favicon: {
			type: 'image',
			data: {
				url: 'https://google.com/favicon.ico'
			}
		}
	}
};
