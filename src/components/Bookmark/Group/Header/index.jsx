import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './header.module.scss';

console.log(styles);

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
		event.preventDefault();
		setCurrentName(event.target.value);
	};

	if (isEditing) {
		return <input value={currentName} onBlur={handleEditEnd} onChange={handleEdit} autoFocus />;
	}

	if (!currentName) {
		return (
			<>
				<h1>Unnamed group</h1>
				<button onClick={handleTitleClick}>Name a group</button>
			</>
		);
	}

	return (
		<header>
			<h1 onClick={handleTitleClick}>{currentName}</h1>
			<button onClick={handleTitleClick}>Edit group name</button>
		</header>
	);
};

BookmarkGroupHeader.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func
};

export default BookmarkGroupHeader;
