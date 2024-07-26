import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../components/Sidebar';
import BookmarkContainer from '../../components/Bookmark/Container';
import { AppDataContext } from '../../contexts/AppData';
import styles from './main.module.scss';

const ViewMain = () => {
	const navigate = useNavigate();
	const { state } = useContext(AppDataContext);

	const handleBookmarkEditButtonClick = (bookmarkItemId) => {
		let bookmarkGroupId;
		let editBookmark;
		state.groups.forEach((group) => {
			const bookmarkIndex = group.bookmarks.findIndex((bookmark) => bookmark.id === bookmarkItemId);
			if (bookmarkIndex !== -1) {
				bookmarkGroupId = group.id;
				editBookmark = group.bookmarks[bookmarkIndex];
				return;
			}
		});

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

			<div className={styles.pageContent}>
				<BookmarkContainer groups={state.groups} onGroupItemEditButtonClick={handleBookmarkEditButtonClick} />
			</div>

			<Outlet />
		</>
	);
};

export default ViewMain;
