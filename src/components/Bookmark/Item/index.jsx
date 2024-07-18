import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BookmarkContainerContext } from '../Container';
import styles from './item.module.scss';
import useLinkClickFix from './hooks/useLinkClickFix';
import Favicon from '../../Favicon';
import FaviconAuto from '../../Favicon/Auto';
import FaviconIcon from '../../Favicon/Icon';
import FaviconText from '../../Favicon/Text';
import FaviconImage from '../../Favicon/Image';

const BookmarkItem = React.forwardRef(({ text, link, size, className, showDraggableHandle, showEditButton = true, favicon, ...props }, ref) => {
	const { onGroupItemEditButtonClick } = useContext(BookmarkContainerContext);
	const linkClickFix = useLinkClickFix();

	return (
		<div ref={ref} className={classNames(styles.bookmarkItem, className)} {...props}>
			{showDraggableHandle && <button className="draggable-handle" aria-hidden></button>}
			{showEditButton && (
				<button className={styles.bookmarkItemEditButton} onClick={onGroupItemEditButtonClick}>
					<FontAwesomeIcon icon={faPen} fixedWidth aria-hidden />
					<span className="screenreader">Edit a bookmark</span>
				</button>
			)}

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

export const publicProps = {
	showEditButton: PropTypes.bool,
	className: PropTypes.string
};

BookmarkItem.displayName = 'BookmarkItem';

BookmarkItem.propTypes = {
	// These 3 properties are unused in this component
	// but they are needed for overall defining the structure
	id: PropTypes.string.isRequired,
	row: PropTypes.number.isRequired,
	column: PropTypes.number.isRequired,

	link: PropTypes.string.isRequired,
	size: PropTypes.oneOf(['small', 'medium', 'wide', 'large']).isRequired,
	text: PropTypes.string,
	favicon: PropTypes.oneOfType([
		PropTypes.shape({ type: 'none' }),
		PropTypes.shape({ type: 'auto', data: PropTypes.shape(FaviconAuto.propTypes) }),
		PropTypes.shape({ type: 'icon', data: PropTypes.shape(FaviconIcon.propTypes) }),
		PropTypes.shape({ type: 'text', data: PropTypes.shape(FaviconText.propTypes) }),
		PropTypes.shape({ type: 'image', data: PropTypes.shape(FaviconImage.propTypes) })
	]),
	showDraggableHandle: PropTypes.bool,

	...publicProps
};

export default BookmarkItem;
