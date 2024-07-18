import React from 'react';
import BookmarkGroup from '.';
import defaultData from '../../../constants/defaultData';
import AppDataProvider from '../../../contexts/AppData';
import BookmarkContainer from '../Container';

export default {
	title: 'Bookmark/Group',
	component: BookmarkGroup,
	decorators: [
		(Story, { args }) => (
			<AppDataProvider useStorage={false} initialData={{ ...defaultData, groups: [args] }}>
				<div style={{ width: 'min(100%, 450px)' }}>
					<BookmarkContainer />
				</div>
			</AppDataProvider>
		)
	],
	parameters: {
		layout: 'padded'
	},
	tags: ['autodocs']
};

export const SampleGroup = {
	args: defaultData.groups[0]
};
