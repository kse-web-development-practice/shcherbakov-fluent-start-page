import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './item.module.scss';
import useLinkClickFix from './hooks/useLinkClickFix';

// eslint-disable-next-line no-unused-vars
const BookmarkItem = React.forwardRef(({ id, text, link, size, className, row, column, showDraggableHandle, ...props }, ref) => {
	const linkClickFix = useLinkClickFix();

	return (
		<div ref={ref} className={`${styles['bookmark-item']} ${className}`} {...props}>
			{showDraggableHandle && <button className="draggable-handle" aria-hidden></button>}
			<a href={link} className={styles['bookmark-item__link']} {...linkClickFix}>
				<span className={styles['bookmark-item__text']}>{size !== 'small' && text}</span>
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
