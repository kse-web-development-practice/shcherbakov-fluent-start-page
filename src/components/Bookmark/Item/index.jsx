import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './item.module.scss';

// eslint-disable-next-line no-unused-vars
const BookmarkItem = React.forwardRef(({ text, link, size, className, row, column, ...props }, ref) => {
	return (
		<a
			ref={ref}
			href={link}
			className={`${styles['bookmark-item']} ${className}`}
			draggable={false} // Solves the issue with drag start on Firefox
			{...props}
		>
			{size !== 'small' && text}
		</a>
	);
});

BookmarkItem.displayName = 'BookmarkItem';

BookmarkItem.propTypes = {
	id: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	size: PropTypes.oneOf(['small', 'medium', 'wide', 'large']).isRequired,
	row: PropTypes.number.isRequired,
	column: PropTypes.number.isRequired,
	text: PropTypes.string
};

export default BookmarkItem;
