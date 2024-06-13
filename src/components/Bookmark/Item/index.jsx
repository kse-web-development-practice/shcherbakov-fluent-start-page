import React from 'react';
import PropTypes from 'prop-types';
import { tileSizes } from '../../../constants/tileSizes';
import * as styles from './item.module.scss';

const Item = ({ text, link, size, row, column }) => {
	const sizing = tileSizes[size];

	return (
		<a
			href={link}
			className={`${styles.item} ${styles[`item_${size}`]}`}
			style={{
				gridRowStart: row,
				gridRowEnd: row + sizing.rows,
				gridColumnStart: column,
				gridColumnEnd: column + sizing.columns,
				aspectRatio: sizing.aspectRatio
			}}
		>
			{size !== 'small' && text}
		</a>
	);
};

Item.propTypes = {
	id: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	size: PropTypes.oneOf(['small', 'medium', 'wide', 'large']).isRequired,
	row: PropTypes.number.isRequired,
	column: PropTypes.number.isRequired,
	text: PropTypes.string
};

export default Item;
