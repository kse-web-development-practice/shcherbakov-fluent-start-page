export const tileSizes = {
	small: {
		rows: 1,
		columns: 1
	},
	medium: {
		rows: 2,
		columns: 2
	},
	wide: {
		rows: 2,
		columns: 4
	},
	large: {
		rows: 4,
		columns: 4
	}
};

/**
 * @type {keyof tileSizes}
 */
export const tileSizeNames = Object.keys(tileSizes);
