import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { GridStack } from 'gridstack';
import BookmarkContainerContext from '../Container/context';
import Header from './Header';
import Item from '../Item';
import styles from './group.module.scss';
import { tileSizes } from '../../../constants/tileSizes';

const BookmarkGroup = ({ id, name, bookmarks = [], maxColumns = 6, layoutGap = 4, showHeader = true }) => {
	// const { groupItemProps, groupHeaderProps, handleGroupLayoutChange } = useContext(BookmarkContainerContext);
	const { groupItemProps, groupHeaderProps } = useContext(BookmarkContainerContext);
	const gridRef = useRef(null);

	// const handleLayoutChange = (layout) => {
	// 	console.log('layout change');
	// 	handleGroupLayoutChange(
	// 		id,
	// 		layout.map(({ i, x, y, w, h }) => ({
	// 			id: i,
	// 			column: x,
	// 			row: y,
	// 			// eslint-disable-next-line no-unused-vars
	// 			size: Object.entries(tileSizes).find(([_, { rows, columns }]) => rows === h && columns === w)[0]
	// 		}))
	// 	);
	// };

	// const handleDrop = (layout, oldItem, newItem) => {
	// 	console.log(layout, oldItem, newItem);
	// };

	useEffect(() => {
		const grid = GridStack.init(
			{
				acceptWidgets: true,
				column: maxColumns,
				maxRow: 10,
				minRow: 2,
				disableResize: true,
				cellHeight: 'auto',
				sizeToContent: true,
				margin: layoutGap / 2
			},
			gridRef.current
		);
		// TODO: implement callbacks

		return () => {
			grid.removeAll();
		};
	}, []);

	return (
		<section className={styles.bookmarkGroup} role="group">
			{showHeader && <Header id={id} name={name} {...groupHeaderProps} />}
			<div ref={gridRef} className="grid-stack">
				{bookmarks.map((bookmark) => (
					<div
						key={bookmark.id}
						className="grid-stack-item"
						gs-id={bookmark.id}
						gs-x={bookmark.column}
						gs-y={bookmark.row}
						gs-w={tileSizes[bookmark.size].columns}
						gs-min-h={tileSizes[bookmark.size].rows} // gs-h does not work
					>
						<div className="grid-stack-item-content">
							<Item {...groupItemProps} {...bookmark} />
						</div>
					</div>
				))}
			</div>
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
