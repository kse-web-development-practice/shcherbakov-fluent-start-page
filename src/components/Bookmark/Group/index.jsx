import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';
import * as styles from './group.module.scss';

const Group = ({ name, bookmarks = [], maxColumns = 6, renderBookmarkItem }) => {
	return (
		<div
			className={styles.group}
			style={{
				gridTemplateColumns: `repeat(${maxColumns}, 1fr)`
			}}
		>
			{name && <h1>{name}</h1>}
			<div className={styles.group__layout}>{bookmarks.map((bookmark) => renderBookmarkItem(bookmark))}</div>
		</div>
	);
};

Group.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	bookmarks: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
	maxColumns: PropTypes.number,
	renderBookmarkItem: PropTypes.func.isRequired // (bookmark: BookmarkItemProps) => React.ReactNode
};

export default Group;
