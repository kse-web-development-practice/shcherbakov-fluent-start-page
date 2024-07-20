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

			<div className={styles.pageContent}>
				<BookmarkContainer onGroupItemEditButtonClick={handleBookmarkEditButtonClick} />
			</div>

			<Outlet />
		</>
	);
};

export default ViewMain;
