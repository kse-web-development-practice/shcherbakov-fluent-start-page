import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import Item from '../Item';
import * as styles from './group.module.scss';
import { tileSizes } from '../../../constants/tileSizes';

const ResponsiveReactGridLayout = WidthProvider(ReactGridLayout);

const BookmarkGroup = ({ id, name, bookmarks = [], maxColumns = 6, layoutGap = 4, renderBookmarkItem, onChange }) => {
	// Implementation of aspect ratio for layout
	// because react-grid-layout does not support it
	// https://github.com/react-grid-layout/react-grid-layout/issues/644
	const [layoutRowHeight, setLayoutRowHeight] = useState(undefined);
	const layoutContainerRef = useRef(null);

	useEffect(() => {
		const layoutContainer = layoutContainerRef.current.elementRef.current;
		setLayoutRowHeight(layoutContainer.clientWidth / maxColumns - layoutGap);
	}, [layoutContainerRef]);

	const handleLayoutChange = (layout) => {
		onChange?.(
			id,
			layout.map(({ x, y, ...item }) => ({
				...item,
				column: x,
				row: y
			}))
		);
	};

	return (
		<div className={styles['bookmark-group']}>
			{name && <h1>{name}</h1>}
			<ResponsiveReactGridLayout
				ref={layoutContainerRef}
				layout={bookmarks.map(({ id, row, column, size }) => ({
					i: id,
					x: column,
					y: row,
					w: tileSizes[size].columns,
					h: tileSizes[size].rows
				}))}
				cols={maxColumns}
				margin={[layoutGap, layoutGap]}
				containerPadding={[0, 0]}
				rowHeight={layoutRowHeight}
				onLayoutChange={handleLayoutChange}
			>
				{bookmarks.map(renderBookmarkItem)}
			</ResponsiveReactGridLayout>
		</div>
	);
};

BookmarkGroup.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	bookmarks: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
	maxColumns: PropTypes.number,
	layoutGap: PropTypes.number,

	renderBookmarkItem: PropTypes.func.isRequired,

	/**
	 * (groupId: string, layout: Array<{ id: string; row: number; column: number; size: string; text: string; link: string }>) => void
	 */
	onChange: PropTypes.func
};

export default BookmarkGroup;
