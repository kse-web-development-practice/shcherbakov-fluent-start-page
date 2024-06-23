import React from 'react';
import BookmarkGroup from '.';
import BookmarkGroupHeader from './Header';
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
		renderGroupHeader: (group) => <BookmarkGroupHeader {...group} />,
		renderBookmarkItem: (bookmark, showDraggableHandle) => (
			<BookmarkItem key={bookmark.id} showDraggableHandle={showDraggableHandle} {...bookmark} />
		)
	}
};
