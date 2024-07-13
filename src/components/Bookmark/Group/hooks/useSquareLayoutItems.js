import { useEffect, useRef, useState } from 'react';

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

	useEffect(() => {
		if (layoutContainerRef.current === null) {
			return;
		}

		const layoutContainer = layoutContainerRef.current.elementRef.current;
		setLayoutRowHeight(layoutContainer.clientWidth / maxColumns - layoutGap);
	}, [layoutContainerRef, maxColumns]);

	return { layoutRowHeight, layoutContainerRef };
};

export default useSquareLayoutItems;
