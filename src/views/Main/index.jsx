import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../components/Sidebar';
import BookmarkGroup from '../../components/Bookmark/Group';
import { AppDataContext } from '../../contexts/AppData';
import LocalStorageService from '../../services/LocalStorageService';
import styles from './main.module.scss';

const ViewMain = () => {
	const navigate = useNavigate();
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

	const handleBookmarkEditButtonClick = (bookmarkGroupId, bookmarkItemId) => {
		const editBookmark = state.groups.find((group) => group.id === bookmarkGroupId).bookmarks.find((bookmark) => bookmark.id === bookmarkItemId);
		navigate('/edit', {
			state: {
				groupId: bookmarkGroupId,
				bookmark: editBookmark
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

			<main className={styles.pageContent}>
				<button onClick={() => LocalStorageService.clearAppData()}>Clear data</button>

				<div className={styles.bookmarksLayout}>
					{state.groups.map((props) => (
						<BookmarkGroup
							key={props.id}
							onLayoutChange={handleBookmarkGroupLayoutChange}
							onTitleChange={handleBookmarkGroupNameChange}
							onItemEditButtonClick={handleBookmarkEditButtonClick}
							{...props}
						/>
					))}
				</div>
			</main>

			<Outlet />
		</>
	);
};

export default ViewMain;
