import React from 'react';
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '.';

export default {
	title: 'Sidebar',
	component: Sidebar,
	decorators: [
		(Story) => (
			<MemoryRouter>
				<Story />
			</MemoryRouter>
		)
	],
	parameters: {
		layout: 'fullscreen'
	}
};

export const AppSidebar = {
	args: {
		items: [
			{
				label: 'Settings',
				icon: faCog,
				linkTo: '#'
			},
			{
				label: 'Create a bookmark',
				icon: faPlus,
				linkTo: '#'
			}
		]
	}
};
