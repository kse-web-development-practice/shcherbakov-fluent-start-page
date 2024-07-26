import React from 'react';
import BookmarkGroup from '.';
import defaultData from '../../../constants/defaultData';
import BookmarkContainer from '../Container';

export default {
	title: 'Bookmark/Group',
	component: BookmarkGroup,
	decorators: [
		(Story, { args }) => (
			<div style={{ width: 'min(100%, 450px)' }}>
				<BookmarkContainer groups={[args]} showCreateGroupButton={false} groupHeaderProps={{ showGroupControls: false }} />
			</div>
		)
	],
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs']
};

export const SampleGroup = {
	args: { ...defaultData.groups[0] }
};
