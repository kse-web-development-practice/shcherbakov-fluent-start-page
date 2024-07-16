import React from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import Header from './Header';
import Item from '../Item';
import useSquareLayoutItems from './hooks/useSquareLayoutItems';
import useMobileUserAgentCheck from '../../../hooks/useMobileUserAgentCheck';
import styles from './group.module.scss';
import { tileSizes } from '../../../constants/tileSizes';

const ResponsiveReactGridLayout = WidthProvider(ReactGridLayout);

const BookmarkGroup = ({
	id,
	name,
	bookmarks = [],
	maxColumns = 6,
	layoutGap = 4,
	hideHeader = false,
	onLayoutChange,
	onTitleChange,
	onItemEditButtonClick
}) => {
	const isMobile = useMobileUserAgentCheck();
	const { layoutRowHeight, layoutContainerRef } = useSquareLayoutItems(maxColumns, layoutGap);

	const handleLayoutChange = (layout) => {
		onLayoutChange?.(
			id,
			layout.map(({ i, x, y, w, h }) => ({
				id: i,
				column: x,
				row: y,
				// eslint-disable-next-line no-unused-vars
				size: Object.entries(tileSizes).find(([_, { rows, columns }]) => rows === h && columns === w)[0]
			}))
		);
	};

	return (
		<section className={styles.bookmarkGroup} role="group">
			{!hideHeader && <Header name={name} onChange={onTitleChange} />}
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
				{bookmarks.map((item) => (
					<Item key={item.id} showDraggableHandle={isMobile} onEditButtonClick={onItemEditButtonClick} {...item} />
				))}
			</ResponsiveReactGridLayout>
		</section>
	);
};

BookmarkGroup.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	bookmarks: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
	maxColumns: PropTypes.number,
	layoutGap: PropTypes.number,
	hideHeader: PropTypes.bool,

	/**
	 * (groupId: string, layout: Array<{ id: string; row: number; column: number; size: string; }>) => void
	 */
	onLayoutChange: PropTypes.func,

	/**
	 * (groupId: string, bookmarkId: string) => void
	 */
	onItemEditButtonClick: PropTypes.func,

	/**
	 * (newTitle: string) => void
	 */
	onTitleChange: PropTypes.func
};

export default BookmarkGroup;
