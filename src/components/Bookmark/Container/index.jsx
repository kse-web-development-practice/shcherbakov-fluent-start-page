import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import BookmarkGroup, { groupStructureProps, publicProps as publicGroupProps } from '../Group';
import { publicProps as publicGroupHeaderProps } from '../Group/Header';
import { publicProps as publicItemProps } from '../Item';
import { AppDataContext } from '../../../contexts/AppData';
import styles from './container.module.scss';
import BookmarkContainerContext from './context';

const BookmarkContainer = ({
	groups = [],
	groupProps = {},
	groupHeaderProps = {},
	groupItemProps = {},
	showCreateGroupButton = true,
	onGroupItemEditButtonClick
}) => {
	const { dispatch } = useContext(AppDataContext);

	const handleShiftGroups = (moveBy) => {
		const length = groups.length;
		const shiftCount = ((-moveBy % length) + length) % length;
		dispatch({
			type: 'SET_BOOKMARKS',
			payload: groups.slice(shiftCount).concat(groups.slice(0, shiftCount))
		});
	};

	const handleCreateGroup = () => {
		dispatch({
			type: 'SET_BOOKMARKS',
			payload: [
				...groups,
				{
					id: uuid(),
					bookmarks: []
				}
			]
		});
	};

	const handleRenameGroup = (groupId, newName) => {
		dispatch({
			type: 'SET_BOOKMARKS',
			payload: groups.map((group) => {
				if (group.id !== groupId) {
					return group;
				}
				return {
					...group,
					name: newName
				};
			})
		});
	};

	const handleRemoveGroup = (groupId) => {
		dispatch({
			type: 'SET_BOOKMARKS',
			payload: groups.filter(({ id }) => id !== groupId)
		});
	};

	/**
	 * @param {string} groupId
	 * @param {Array<{ id: string; row: number; column: number; size: string; }>} layout
	 */
	const handleGroupLayoutChange = (groupId, layout) => {
		dispatch({
			type: 'SET_BOOKMARKS',
			payload: groups.map((group) => {
				if (group.id !== groupId) {
					return group;
				}

				return {
					...group,
					bookmarks: group.bookmarks.map((groupBookmarks) => {
						const updatedBookmark = layout.find(({ id }) => id === groupBookmarks.id);

						if (!updatedBookmark) {
							return groupBookmarks;
						}

						return {
							...groupBookmarks,
							...updatedBookmark
						};
					})
				};
			})
		});
	};

	const CreateGroupButton = () => <button onClick={handleCreateGroup}>Create a new group</button>;

	return (
		<BookmarkContainerContext.Provider
			value={{
				groupProps,
				groupHeaderProps,
				groupItemProps,
				showCreateGroupButton,
				handleShiftGroups,
				handleCreateGroup,
				handleRenameGroup,
				handleRemoveGroup,
				handleGroupLayoutChange,

				onGroupItemEditButtonClick
			}}
		>
			<article className={styles.bookmarkContainer}>
				{groups.map(
					(
						group,
						index // Must be used to make group ordering buttons work properly
					) => (
						<BookmarkGroup key={`${group.id}-${index}`} {...group} {...groupProps} />
					)
				)}
				{showCreateGroupButton && <CreateGroupButton />}
			</article>
		</BookmarkContainerContext.Provider>
	);
};

BookmarkContainer.propTypes = {
	groups: PropTypes.arrayOf(PropTypes.shape(groupStructureProps)),
	groupProps: PropTypes.shape(publicGroupProps),
	groupHeaderProps: PropTypes.shape(publicGroupHeaderProps),
	groupItemProps: PropTypes.shape(publicItemProps),
	showCreateGroupButton: PropTypes.bool,

	/**
	 * (groupId: string, bookmarkId: string) => void
	 */
	onGroupItemEditButtonClick: PropTypes.func
};

export default BookmarkContainer;
