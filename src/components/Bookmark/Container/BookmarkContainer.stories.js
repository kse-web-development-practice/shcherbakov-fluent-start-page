import React, { useContext } from 'react';
import { fn } from '@storybook/test';
import BookmarkContainer from '.';
import { AppDataContext } from '../../../contexts/AppData';

export default {
	title: 'Bookmark/Container',
	component: BookmarkContainer,
	decorators: [
		(Story, { args }) => {
			const { state } = useContext(AppDataContext);
			return <BookmarkContainer editAppData={false} groups={state.groups} {...args} />;
		}
	]
};

export const Container = {
	args: {
		onGroupItemEditButtonClick: fn()
	}
};
