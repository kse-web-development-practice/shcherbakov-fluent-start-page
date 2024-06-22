import React from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import Item from '../Item';
import useSquareLayoutItems from './hooks/useSquareLayoutItems';
import useMobileCheck from '../../../hooks/useMobileCheck';
import * as styles from './group.module.scss';
import { tileSizes } from '../../../constants/tileSizes';

const ResponsiveReactGridLayout = WidthProvider(ReactGridLayout);

const BookmarkGroup = ({ id, name, bookmarks = [], maxColumns = 6, layoutGap = 4, renderBookmarkItem, onChange }) => {
	const isMobile = useMobileCheck();
	const { layoutRowHeight, layoutContainerRef } = useSquareLayoutItems(maxColumns, layoutGap);

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
				draggableHandle={isMobile ? '.draggable-handle' : undefined}
			>
				{bookmarks.map((item) => renderBookmarkItem(item, isMobile))}
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
	 * (groupId: string, layout: Array<{ id: string; row: number; column: number; size: string; }>) => void
	 */
	onChange: PropTypes.func
};

export default BookmarkGroup;
