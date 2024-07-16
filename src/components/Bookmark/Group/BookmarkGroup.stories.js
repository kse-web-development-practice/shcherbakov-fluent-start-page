import React from 'react';
import BookmarkGroup from '.';
import defaultData from '../../../constants/defaultData';
import { fn } from '@storybook/test';

export default {
	title: 'Bookmark/Group',
	component: BookmarkGroup,
	decorators: [
		(Story) => (
			<div style={{ width: 'min(100%, 450px)' }}>
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
		onLayoutChange: fn(),
		onTitleChange: fn(),
		onItemEditButtonClick: fn()
	}
};
