import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.scss';
import BookmarkContainerContext from '../../Container/context';

const BookmarkGroupHeader = ({ id, name, showGroupControls = true }) => {
	const { handleShiftGroups, handleRenameGroup, handleRemoveGroup } = useContext(BookmarkContainerContext);

	const [currentName, setCurrentName] = useState(name);
	const [isEditing, setIsEditing] = useState(false);

	const handleTitleClick = () => {
		setIsEditing(true);
	};

	const handleEditEnd = () => {
		setIsEditing(false);
		handleRenameGroup(id, currentName);
	};

	const AccessabilityEditGroupName = () => (
		<button onClick={handleTitleClick} className="screenreader">
			Edit group name
		</button>
	);

	const ControlButtons = () =>
		showGroupControls ? (
			<div>
				<button aria-label="Move group back" onClick={() => handleShiftGroups(-1)}>
					<FontAwesomeIcon icon={faArrowLeft} fixedWidth aria-hidden />
				</button>
				<button aria-label="Move group forward" onClick={() => handleShiftGroups(1)}>
					<FontAwesomeIcon icon={faArrowRight} fixedWidth aria-hidden />
				</button>
				<button aria-label="Remove group" onClick={() => handleRemoveGroup(id)}>
					<FontAwesomeIcon icon={faTrash} fixedWidth aria-hidden />
				</button>
			</div>
		) : null;

	const EditState = () => {
		// Confirm edit on escape or enter
		const handleKeyDown = (event) => {
			if (event.key === 'Escape' || event.key === 'Enter') {
				handleEditEnd();
			}
		};

		return (
			<input
				value={currentName}
				onBlur={() => handleEditEnd()}
				onChange={({ target }) => setCurrentName(target.value)}
				onKeyDown={handleKeyDown}
				autoFocus
			/>
		);
	};

	const ConditionalContent = () => {
		if (isEditing) {
			return <EditState />;
		}

		return (
			<>
				<h1 aria-label={currentName || 'Unnamed group'} onClick={handleTitleClick}>
					{currentName || 'Name a group'}
				</h1>
				<ControlButtons />
				<AccessabilityEditGroupName />
			</>
		);
	};

	return (
		<header
			className={classNames(styles.bookmarkGroupHeader, {
				[styles.bookmarkGroupHeaderStateEdit]: isEditing,
				[styles.bookmarkGroupHeaderStateUnnamed]: !currentName
			})}
		>
			<ConditionalContent />
		</header>
	);
};

export const publicProps = {
	showGroupControls: PropTypes.bool
};

BookmarkGroupHeader.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	...publicProps
};

export default BookmarkGroupHeader;
