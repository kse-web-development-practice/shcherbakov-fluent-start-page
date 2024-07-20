import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import BookmarkGroup, { publicProps as publicGroupProps } from '../Group';
import { publicProps as publicGroupHeaderProps } from '../Group/Header';
import { publicProps as publicItemProps } from '../Item';
import { AppDataContext } from '../../../contexts/AppData';
import styles from './container.module.scss';
import BookmarkContainerContext from './context';

const BookmarkContainer = ({
	groupProps = {},
	groupHeaderProps = {},
	groupItemProps = {},
	showCreateGroupButton = true,
	onGroupItemEditButtonClick
}) => {
	const containerRef = useRef(null);
	const { state, dispatch } = useContext(AppDataContext);

	const handleShiftGroups = (moveBy) => {
		const length = state.groups.length;
		const shiftCount = ((-moveBy % length) + length) % length;
		dispatch({
			type: 'SET_BOOKMARKS',
			payload: state.groups.slice(shiftCount).concat(state.groups.slice(0, shiftCount))
		});
	};

	const handleCreateGroup = () => {
		dispatch({
			type: 'SET_BOOKMARKS',
			payload: [
				...state.groups,
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
			payload: state.groups.map((group) => {
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
			payload: state.groups.filter(({ id }) => id !== groupId)
		});
	};

	/**
	 * @param {string} groupId
	 * @param {Array<{ id: string; row: number; column: number; size: string; }>} layout
	 */
	const handleGroupLayoutChange = (groupId, layout) => {
		dispatch({
			type: 'SET_BOOKMARKS',
			payload: state.groups.map((group) => {
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
			<article ref={containerRef} className={styles.bookmarkContainer}>
				{state.groups.map((group) => (
					<BookmarkGroup key={group.id} {...group} {...groupProps} />
				))}
				{showCreateGroupButton && <CreateGroupButton />}
			</article>
		</BookmarkContainerContext.Provider>
	);
};

BookmarkContainer.propTypes = {
	groupProps: PropTypes.shape(publicGroupProps),
	groupHeaderProps: PropTypes.shape(publicGroupHeaderProps),
	groupItemProps: PropTypes.shape(publicItemProps),
	showCreateGroupButton: PropTypes.bool,

	groups: PropTypes.arrayOf(PropTypes.shape(BookmarkGroup.propTypes)),

	/**
	 * (groupId: string, bookmarkId: string) => void
	 */
	onGroupItemEditButtonClick: PropTypes.func
};

export default React.memo(BookmarkContainer);
