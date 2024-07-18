import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ReactGridLayout, { WidthProvider } from 'react-grid-layout';
import { BookmarkContainerContext } from '../Container';
import Header from './Header';
import Item from '../Item';
import useSquareLayoutItems from './hooks/useSquareLayoutItems';
import useMobileUserAgentCheck from '../../../hooks/useMobileUserAgentCheck';
import styles from './group.module.scss';
import { tileSizes } from '../../../constants/tileSizes';

const ResponsiveReactGridLayout = WidthProvider(ReactGridLayout);

const BookmarkGroup = ({ id, name, bookmarks = [], maxColumns = 6, layoutGap = 4, showHeader = true }) => {
	const { handleGroupLayoutChange } = useContext(BookmarkContainerContext);

	const isMobile = useMobileUserAgentCheck();
	const { layoutRowHeight, layoutContainerRef } = useSquareLayoutItems(maxColumns, layoutGap);

	const handleLayoutChange = (layout) => {
		handleGroupLayoutChange(
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
			{showHeader && <Header id={id} name={name} />}
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
					<Item key={item.id} showDraggableHandle={isMobile} {...item} />
				))}
			</ResponsiveReactGridLayout>
		</section>
	);
};

export const publicProps = {
	maxColumns: PropTypes.number,
	layoutGap: PropTypes.number,
	showHeader: PropTypes.bool
};

BookmarkGroup.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	bookmarks: PropTypes.arrayOf(PropTypes.shape(Item.propTypes)),
	...publicProps
};

export default BookmarkGroup;
