import React from 'react';

import BookmarkGroup from '../Group';
import BookmarkItem from '.';

export default {
	title: 'Bookmark/Item',
	component: BookmarkItem,
	decorators: [
		(Story, { args }) => (
			<BookmarkGroup id="0" bookmarks={[args]} renderBookmarkItem={(bookmark) => <BookmarkItem key={bookmark.id} {...bookmark} />} />
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
		size: 'small'
	}
};

export const MediumBookmark = {
	args: {
		id: '0',
		link: '#',
		row: 0,
		column: 0,
		size: 'medium'
	}
};

export const WideBookmark = {
	args: {
		id: '0',
		link: '#',
		row: 0,
		column: 0,
		size: 'wide'
	}
};

export const LargeBookmark = {
	args: {
		id: '0',
		link: '#',
		row: 0,
		column: 0,
		size: 'large'
	}
};
