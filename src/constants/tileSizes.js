export const tileSizes = {
	small: {
		rows: 1,
		columns: 1,
		aspectRatio: '1 / 1'
	},
	medium: {
		rows: 2,
		columns: 2,
		aspectRatio: '1 / 1'
	},
	wide: {
		rows: 2,
		columns: 4,
		aspectRatio: '2 / 0'
	},
	large: {
		rows: 4,
		columns: 4,
		aspectRatio: '1 / 1'
	}
};

/**
 * @type {keyof tileSizes}
 */
export const tileSizeNames = Object.keys(tileSizes);
