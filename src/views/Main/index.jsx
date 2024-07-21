import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../../components/Sidebar';
import BookmarkContainer from '../../components/Bookmark/Container';
import { AppDataContext } from '../../contexts/AppData';
import useTheme from '../../hooks/useTheme';
import styles from './main.module.scss';
import classNames from 'classnames';

const ViewMain = () => {
	const navigate = useNavigate();
	const { state } = useContext(AppDataContext);
	const theme = useTheme();

	const handleBookmarkEditButtonClick = (bookmarkItemId) => {
		let bookmarkGroupId;
		let editBookmark;
		state.groups.forEach((group) => {
			editBookmark = group.bookmarks.find((bookmark) => bookmark.id === bookmarkItemId);
			if (editBookmark) {
				bookmarkGroupId = group.id;
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

			<div className={classNames(styles.pageContent, styles[`pageContentTheme${theme}`])}>
				<BookmarkContainer groups={state.groups} onGroupItemEditButtonClick={handleBookmarkEditButtonClick} />
			</div>

			<Outlet />
		</>
	);
};

export default ViewMain;
