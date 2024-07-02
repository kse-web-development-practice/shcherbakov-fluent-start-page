import React from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import './assets/styles/styles.scss';
import ViewMain from './views/Main';
import ViewCreateBookmark from './views/CreateBookmark';
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
					element: <ViewCreateBookmark />
				},
				{
					path: '/settings',
					element: <ViewAppSettings />
				}
			]
		}
	],
	{
		initialEntries: ['/'],
		initialIndex: 0
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
