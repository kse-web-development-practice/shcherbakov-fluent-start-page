import React from 'react';
import BookmarkGroup from './index';
import defaultData from '../../../constants/defaultData';
import Item from '../Item';

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
		maxColumns: BookmarkGroup.defaultProps.maxColumns,
		renderBookmarkItem: (bookmark) => <Item {...bookmark} />
	}
};
