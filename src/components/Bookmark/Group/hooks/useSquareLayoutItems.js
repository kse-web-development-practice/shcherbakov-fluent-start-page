import { useRef, useEffect, useState } from 'react';

/**
 * Implementation of aspect ratio for react-grid-layout
 * because the library does not support it
 * https://github.com/react-grid-layout/react-grid-layout/issues/644
 *
 * @param {number} maxColumns
 * @param {number} layoutGap
 * @returns {{
 * 	layoutRowHeight: number?;
 * 	layoutContainerRef: React.MutableRefObject<null>;
 * }}
 */
const useSquareLayoutItems = (maxColumns, layoutGap) => {
	const [layoutRowHeight, setLayoutRowHeight] = useState(0);
	const layoutContainerRef = useRef(null);

	const resizeHeight = (containerWidth) => {
		setLayoutRowHeight(containerWidth / maxColumns - layoutGap);
	};

	// Handle layout container horizontal resizing
	useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			for (let entry of entries) {
				resizeHeight(entry.contentRect.width);
			}
		});

		if (layoutContainerRef.current) {
			observer.observe(layoutContainerRef.current.elementRef.current);
		}

		return () => {
			observer.disconnect();
		};
	}, [maxColumns, layoutGap]);

	return { layoutRowHeight, layoutContainerRef };
};

export default useSquareLayoutItems;
