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
	const gridRef = useRef(null);
	const gridContainerRef = useRef(null);
	const gridItemsRef = useRef(new Map());

	useEffect(() => {
		if (!gridRef.current) {
			gridRef.current = GridStack.init(
				{
					// Allows to drag and drop bookmarks across different groups
					// but can't manage to make it work properly
					// acceptWidgets: true,

					column: maxColumns,
					maxRow: 10,
					minRow: 2,
					disableResize: true,
					cellHeight: 'auto',
					margin: layoutGap
				},
				gridContainerRef.current
			);

			gridRef.current.on('change', (event, items) => {
				// const data = gridRef.current.save(false, false);
				handleGroupLayoutChange(
					id,
					items.map(({ id, x, y }) => ({ id, column: x, row: y }))
				);
			});
		}
	}, []);

	useEffect(() => {
		if (gridRef.current) {
			gridRef.current.batchUpdate();
			gridRef.current.removeAll(false);

			bookmarks.forEach((bookmark) => {
				gridRef.current.makeWidget(gridItemsRef.current.get(bookmark.id));
			});

			gridRef.current.batchUpdate(false);
		}
	}, [bookmarks]);

	return (
		<section className={styles.bookmarkGroup} role="group">
			{showHeader && <Header id={id} name={name} {...groupHeaderProps} />}
			<div ref={gridContainerRef} className="grid-stack">
				{bookmarks.map((bookmark) => (
					<div
						key={bookmark.id}
						ref={(node) => {
							if (node) {
								gridItemsRef.current.set(bookmark.id, node);
							} else {
								gridItemsRef.current.delete(bookmark.id);
							}
						}}
						className="grid-stack-item"
						gs-id={bookmark.id}
						gs-x={bookmark.column}
						gs-y={bookmark.row}
						// gs-w does not work on changing bookmark position
						gs-min-w={tileSizes[bookmark.size].columns}
						gs-max-w={tileSizes[bookmark.size].columns}
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

export const groupStructureProps = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	bookmarks: PropTypes.arrayOf(PropTypes.shape(Item.propTypes))
};

BookmarkGroup.propTypes = {
	...groupStructureProps,
	...publicProps
};

export default BookmarkGroup;
