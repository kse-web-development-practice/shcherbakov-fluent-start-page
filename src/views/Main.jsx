import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import BookmarkGroup from '../components/Bookmark/Group';
import { AppDataContext } from '../contexts/AppData';
import LocalStorageService from '../services/LocalStorageService';
import BookmarkGroupHeader from '../components/Bookmark/Group/Header';

const ViewMain = () => {
	const { state, dispatch } = useContext(AppDataContext);

	const handleBookmarkGroupLayoutChange = (groupId, newLayout) => {
		dispatch({
			type: 'SET_BOOKMARK_GROUP_LAYOUT',
			payload: {
				id: groupId,
				layout: newLayout
			}
		});
	};

	const handleBookmarkGroupNameChange = (groupId, newName) => {
		dispatch({
			type: 'RENAME_BOOKMARK_GROUP',
			payload: {
				id: groupId,
				newName
			}
		});
	};

	return (
		<>
			<Sidebar
				items={[
					{
						label: 'Settings',
						icon: faCog,
						linkTo: '/settings'
					},
					{
						label: 'Create a bookmark',
						icon: faPlus,
						linkTo: '/add'
					}
				]}
			/>
			<h1>Bookmarks</h1>
			<button onClick={() => LocalStorageService.clearAppData()}>Clear data</button>

			{state.groups.map((props) => (
				<BookmarkGroup
					key={props.id}
					onLayoutChange={handleBookmarkGroupLayoutChange}
					renderGroupHeader={(props) => (
						<BookmarkGroupHeader onChange={(newName) => handleBookmarkGroupNameChange(props.id, newName)} {...props} />
					)}
					{...props}
				/>
			))}

			<Outlet />
		</>
	);
};

export default ViewMain;
