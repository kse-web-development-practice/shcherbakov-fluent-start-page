import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item/index';
import * as styles from './group.module.scss';

const Group = ({ name, bookmarks, maxColumns, renderBookmarkItem }) => {
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

Group.defaultProps = {
	bookmarks: [],
	maxColumns: 6
};

Group.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	bookmarks: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
	maxColumns: PropTypes.number,
	renderBookmarkItem: PropTypes.func.isRequired // (bookmark: BookmarkItemProps) => React.ReactNode
};

export default Group;
