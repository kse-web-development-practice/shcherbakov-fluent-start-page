import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './item.module.scss';
import useLinkClickFix from './hooks/useLinkClickFix';
import Favicon from '../../Favicon';
import FaviconAuto from '../../Favicon/Auto';
import FaviconIcon from '../../Favicon/Icon';
import FaviconText from '../../Favicon/Text';
import FaviconImage from '../../Favicon/Image';

// eslint-disable-next-line no-unused-vars
const BookmarkItem = React.forwardRef(({ id, text, link, size, className, row, column, showDraggableHandle, favicon, ...props }, ref) => {
	const linkClickFix = useLinkClickFix();

	return (
		<div ref={ref} className={classNames(styles.bookmarkItem, className)} {...props}>
			{showDraggableHandle && <button className="draggable-handle" aria-hidden></button>}
			<a href={link} className={styles.bookmarkItemLink} {...linkClickFix}>
				{favicon && (
					<Favicon
						className={classNames(styles.bookmarkItemFavicon, {
							[styles.bookmarkItemFaviconIcon]: favicon.type === 'icon',
							[styles.bookmarkItemFaviconImage]: favicon.type === 'image' || favicon.type === 'auto',
							[styles.bookmarkItemFaviconText]: favicon.type === 'text'
						})}
						{...favicon}
					/>
				)}
				<span className={styles.bookmarkItemText}>{size !== 'small' && text}</span>
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
	favicon: PropTypes.oneOfType([
		PropTypes.shape({ type: 'none' }),
		PropTypes.shape({ type: 'auto', data: PropTypes.shape(FaviconAuto.propTypes) }),
		PropTypes.shape({ type: 'icon', data: PropTypes.shape(FaviconIcon.propTypes) }),
		PropTypes.shape({ type: 'text', data: PropTypes.shape(FaviconText.propTypes) }),
		PropTypes.shape({ type: 'image', data: PropTypes.shape(FaviconImage.propTypes) })
	]),
	showDraggableHandle: PropTypes.bool
};

export default BookmarkItem;
