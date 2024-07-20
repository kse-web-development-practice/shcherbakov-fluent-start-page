import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { GridStack } from 'gridstack';
import BookmarkContainerContext from '../Container/context';
import Header from './Header';
import Item from '../Item';
import styles from './group.module.scss';
import { tileSizes } from '../../../constants/tileSizes';

const BookmarkGroup = ({ id, name, bookmarks = [], maxColumns = 6, layoutGap = 2, showHeader = true }) => {
	const { groupItemProps, groupHeaderProps, handleGroupLayoutChange } = useContext(BookmarkContainerContext);
	const gridContainerRef = useRef(null);
	const gridRef = useRef(null);

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
				margin: layoutGap
			},
			gridContainerRef.current
		);

		grid.on('change', () => {
			const data = gridRef.current.save(false, false);

			handleGroupLayoutChange(
				id,
				data.map((item) => ({
					id: item.id,
					column: item.x,
					row: item.y,
					// eslint-disable-next-line no-unused-vars
					size: Object.entries(tileSizes).find(([_, { rows, columns }]) => rows === item.minH && columns === item.minW)[0]
				}))
			);
		});
	}, []);

	return (
		<section className={styles.bookmarkGroup} role="group">
			{showHeader && <Header id={id} name={name} {...groupHeaderProps} />}
			<div ref={gridContainerRef} className="grid-stack">
				{bookmarks.map((bookmark) => (
					<div
						key={bookmark.id}
						className="grid-stack-item"
						gs-id={bookmark.id}
						gs-x={bookmark.column}
						gs-y={bookmark.row}
						// gs-w does not work on changing bookmark position
						gs-max-w={tileSizes[bookmark.size].columns}
						gs-min-w={tileSizes[bookmark.size].columns}
						// gs-h does not work
						gs-min-h={tileSizes[bookmark.size].rows}
						gs-max-h={tileSizes[bookmark.size].rows}
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
