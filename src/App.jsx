import React from 'react';
import { Link, Outlet, RouterProvider, createMemoryRouter } from 'react-router-dom';
import './assets/styles/styles.scss';
import Modal from './components/Modal';

const router = createMemoryRouter(
	[
		{
			path: '/',
			element: (
				<>
					<h1>Bookmarks</h1>
					<Link to="/add">Add a bookmark</Link>
					<Outlet />
				</>
			),
			children: [
				{
					path: '/add',
					element: <Modal />
				}
			]
		}
	],
	{
		initialEntries: ['/', '/add'],
		initialIndex: 0
	}
);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
