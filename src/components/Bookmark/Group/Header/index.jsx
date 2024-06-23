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

	const handleEdit = (event) => {
		setCurrentName(event.target.value);
	};

	const AccessabilityEditGroupName = () => (
		<button onClick={handleTitleClick} className="screenreader">
			Edit group name
		</button>
	);

	const ConditionalContent = () => {
		if (isEditing) {
			return <input value={currentName} onBlur={handleEditEnd} onChange={handleEdit} autoFocus />;
		}

		if (!currentName) {
			return (
				<>
					<h1 aria-label="Unnamed group">Name a group</h1>
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
