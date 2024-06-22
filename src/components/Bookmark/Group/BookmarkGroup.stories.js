import React from 'react';
import BookmarkGroup from '.';
import BookmarkItem from '../Item';
import defaultData from '../../../constants/defaultData';

export default {
	title: 'Bookmark/Group',
	component: BookmarkGroup,
	decorators: [
		(Story) => (
			<div style={{ width: 420 }}>
				<Story />
			</div>
		)
	],
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs']
};

export const SampleGroup = {
	args: {
		...defaultData.groups[0],
		renderBookmarkItem: (bookmark, showDraggableHandle) => (
			<BookmarkItem key={bookmark.id} showDraggableHandle={showDraggableHandle} {...bookmark} />
		)
	}
};
