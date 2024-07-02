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
	const [layoutRowHeight, setLayoutRowHeight] = useState(undefined);
	const layoutContainerRef = useRef(null);

	const resizeHeight = (containerWidth) => {
		setLayoutRowHeight(containerWidth / maxColumns - layoutGap);
	};

	const windowResizeHandler = (event) => {
		resizeHeight(event.target.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', windowResizeHandler);
		return () => window.removeEventListener('resize', windowResizeHandler);
	}, []);

	useEffect(() => {
		if (layoutContainerRef.current === null) {
			return;
		}

		resizeHeight(layoutContainerRef.current.elementRef.current.clientWidth);
	}, [layoutContainerRef, maxColumns]);

	return { layoutRowHeight, layoutContainerRef };
};

export default useSquareLayoutItems;
