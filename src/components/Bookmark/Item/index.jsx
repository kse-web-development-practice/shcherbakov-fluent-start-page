import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BookmarkContainerContext from '../Container/context';
import styles from './item.module.scss';
// import useLinkClickFix from './hooks/useLinkClickFix';
import Favicon from '../../Favicon';
import FaviconAuto from '../../Favicon/Auto';
import FaviconIcon from '../../Favicon/Icon';
import FaviconText from '../../Favicon/Text';
import FaviconImage from '../../Favicon/Image';
// import { tileSizes } from '../../../constants/tileSizes';

const BookmarkItem = ({ text, link, size, showDraggableHandle, showEditButton = true, favicon }) => {
	const { onGroupItemEditButtonClick } = useContext(BookmarkContainerContext);

	return (
		<div className={styles.bookmarkItem}>
			{showDraggableHandle && <button className="draggable-handle" aria-hidden></button>}
			{showEditButton && (
				<button className={styles.bookmarkItemEditButton} onClick={onGroupItemEditButtonClick}>
					<FontAwesomeIcon icon={faPen} fixedWidth aria-hidden />
					<span className="screenreader">Edit a bookmark</span>
				</button>
			)}

			<a href={link} className={styles.bookmarkItemLink}>
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
};

export const publicProps = {
	showEditButton: PropTypes.bool
};

BookmarkItem.propTypes = {
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
