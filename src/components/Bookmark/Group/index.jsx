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
	renderGroupHeader = (group) => <Header {...group} />,
	renderBookmarkItem = (bookmark, showDraggableHandle) => <Item key={bookmark.id} showDraggableHandle={showDraggableHandle} {...bookmark} />,
	onChange
}) => {
	const isMobile = useMobileUserAgentCheck();
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
		<section className={styles.bookmarkGroup} role="group">
			{renderGroupHeader?.({ id, name })}
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
		</section>
	);
};

BookmarkGroup.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	bookmarks: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
	maxColumns: PropTypes.number,
	layoutGap: PropTypes.number,

	/**
	 * ({ id: string, name: string }) => React.ReactNode;
	 */
	renderGroupHeader: PropTypes.func,

	renderBookmarkItem: PropTypes.func,

	/**
	 * (groupId: string, layout: Array<{ id: string; row: number; column: number; size: string; }>) => void
	 */
	onChange: PropTypes.func
};

export default BookmarkGroup;
