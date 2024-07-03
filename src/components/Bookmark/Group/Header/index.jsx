import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './header.module.scss';

const BookmarkGroupHeader = ({ name, onChange }) => {
	const [currentName, setCurrentName] = useState(name);
	const [isEditing, setIsEditing] = useState(false);

	const handleTitleClick = () => {
		setIsEditing(true);
	};

	const handleEditEnd = () => {
		setIsEditing(false);
		onChange?.(currentName);
	};

	const AccessabilityEditGroupName = () => (
		<button onClick={handleTitleClick} className="screenreader">
			Edit group name
		</button>
	);

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

		if (!currentName) {
			return (
				<>
					<h1 aria-label="Unnamed group" onClick={handleTitleClick}>
						Name a group
					</h1>
					<AccessabilityEditGroupName />
				</>
			);
		}

		return (
			<>
				<h1 onClick={handleTitleClick}>{currentName}</h1>
				<AccessabilityEditGroupName />
			</>
		);
	};

	return (
		<header
			className={classNames(styles.bookmarkGroupHeader, {
				[styles.bookmarkGroupHeaderEdit]: isEditing,
				[styles.bookmarkGroupHeaderUnnamed]: !currentName
			})}
		>
			<ConditionalContent />
		</header>
	);
};

BookmarkGroupHeader.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func
};

export default BookmarkGroupHeader;
