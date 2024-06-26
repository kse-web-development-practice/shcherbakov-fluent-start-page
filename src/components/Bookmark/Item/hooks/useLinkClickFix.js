import { useState } from 'react';

/**
 * Solves a bug when a link opens right after dragging.
 *
 * If user holds a link for more than N milliseconds,
 * then it counts as dragging and link will not be opened.
 *
 * This is very hacky, but it works
 *
 * @param {number} dragStartTimeout
 */
const useLinkClickFix = (dragStartTimeoutInMilliseconds = 100) => {
	const [lastDraggingStartTimestamp, setLastDraggingStartTimestamp] = useState(null);

	const onMouseDown = () => {
		setLastDraggingStartTimestamp(new Date().getTime());
	};

	const onClick = (event) => {
		const dragTimestampDifference = new Date().getTime() - lastDraggingStartTimestamp;
		if (dragTimestampDifference > dragStartTimeoutInMilliseconds) {
			event.preventDefault();
		}
	};

	return {
		draggable: false, // Prevents link from being stuck on the drag start
		onMouseDown,
		onClick
	};
};

export default useLinkClickFix;
