import React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import './assets/styles/styles.scss';
import ViewMain from './views/Main';
import ViewBookmarkFormCreate from './views/BookmarkForm/Create';
import ViewBookmarkFormEdit from './views/BookmarkForm/Edit';
import ViewAppSettings from './views/AppSettings';
import AppDataProvider from './contexts/AppData';

const router = createMemoryRouter(
	[
		{
			path: '/',
			element: <ViewMain />,
			children: [
				{
					path: '/add',
					element: <ViewBookmarkFormCreate />
				},
				{
					path: '/edit',
					element: <ViewBookmarkFormEdit />
				},
				{
					path: '/settings',
					element: <ViewAppSettings />
				}
			]
		}
	],
	{
		// eslint-disable-next-line no-undef
		initialEntries: [process.env.BASE_URL ?? '/'],
		initialIndex: 0,
		// eslint-disable-next-line no-undef
		basename: process.env.BASE_URL ?? '/'
	}
);

const App = () => {
	return (
		<AppDataProvider>
			<RouterProvider router={router} />
		</AppDataProvider>
	);
};

export default App;
