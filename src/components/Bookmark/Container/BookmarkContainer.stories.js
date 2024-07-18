import React from 'react';
import { fn } from '@storybook/test';
import BookmarkContainer from '.';
import AppDataProvider from '../../../contexts/AppData';

export default {
	title: 'Bookmark/Container',
	component: BookmarkContainer,
	decorators: [
		(Story) => (
			<AppDataProvider useStorage={false}>
				<Story />
			</AppDataProvider>
		)
	]
};

export const Container = {
	args: {
		onGroupItemEditButtonClick: fn()
	}
};
