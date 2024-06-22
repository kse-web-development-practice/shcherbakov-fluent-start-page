import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './item.module.scss';

// eslint-disable-next-line no-unused-vars
const BookmarkItem = React.forwardRef(({ text, link, size, className, row, column, showDraggableHandle, ...props }, ref) => {
	return (
		<div ref={ref} className={`${styles['bookmark-item']} ${className}`} {...props}>
			{showDraggableHandle && <button className="draggable-handle" aria-hidden></button>}
			<a href={link} className={styles['bookmark-item__link']} draggable={false}>
				{size !== 'small' && text}
			</a>
		</div>
	);
});

BookmarkItem.displayName = 'BookmarkItem';

BookmarkItem.propTypes = {
	id: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	size: PropTypes.oneOf(['small', 'medium', 'wide', 'large']).isRequired,
	row: PropTypes.number.isRequired,
	column: PropTypes.number.isRequired,
	text: PropTypes.string,
	showDraggableHandle: PropTypes.bool
};

export default BookmarkItem;
