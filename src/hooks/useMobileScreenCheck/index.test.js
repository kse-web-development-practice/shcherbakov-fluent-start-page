import useMobileScreenCheck from '.';
import { useMediaQuery } from 'react-responsive';

jest.mock('react-responsive', () => ({
	useMediaQuery: jest.fn()
}));

const screenWidths = [
	{
		screenWidth: 600,
		isMobile: false
	},
	{
		screenWidth: 500,
		isMobile: true
	}
];

describe('useMobileScreenCheck', () => {
	describe.each(screenWidths)('test for width $screenWidth', (item) => {
		beforeAll(() => {
			useMediaQuery.mockImplementation(({ maxWidth }) => item.screenWidth <= maxWidth);
		});

		it(`returns ${item.isMobile}`, () => {
			expect(useMobileScreenCheck()).toBe(item.isMobile);
		});
	});
});
