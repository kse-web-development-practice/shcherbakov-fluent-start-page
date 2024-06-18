import React from 'react';
import BookmarkGroup from '.';
import BookmarkItem from '../Item';
import defaultData from '../../../constants/defaultData';

export default {
	title: 'Bookmark/Group',
	component: BookmarkGroup,
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs']
};

export const SampleGroup = {
	args: {
		...defaultData.groups[0],
		maxColumns: 6,
		renderBookmarkItem: (bookmark) => <BookmarkItem key={bookmark.id} {...bookmark} />
	}
};
