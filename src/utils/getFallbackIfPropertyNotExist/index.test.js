import getFallbackIfPropertyNotExist from '.';

describe('getFallbackIfPropertyNotExist', () => {
	describe('if key exists', () => {
		it('should return value', () => {
			const obj = { a: 1 };
			const result = getFallbackIfPropertyNotExist(obj, 'a', 'fallback');
			expect(result).toBe(1);
		});
	});

	describe('if key does not exist', () => {
		it('should return fallback', () => {
			const obj = { a: 1 };
			const result = getFallbackIfPropertyNotExist(obj, 'b', 'fallback');
			expect(result).toBe('fallback');
		});
	});

	describe('if nested key exists', () => {
		it('should return value', () => {
			const obj = { a: { b: 2 } };
			const result = getFallbackIfPropertyNotExist(obj, 'a.b', 'fallback');
			expect(result).toBe(2);
		});
	});

	describe('if nested key does not exist', () => {
		it('should return fallback', () => {
			const obj = { a: { b: 2 } };
			const result = getFallbackIfPropertyNotExist(obj, 'a.c', 'fallback');
			expect(result).toBe('fallback');
		});
	});
});
