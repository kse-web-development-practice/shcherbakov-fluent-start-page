import FontAwesomeService from '.';

jest.mock('@fortawesome/free-solid-svg-icons', () => ({
	fas: {
		faHouse: { prefix: 'fas', iconName: 'house' },
		faMagnifyingGlass: { prefix: 'fas', iconName: 'magnifying-glass' },
		faUser: { prefix: 'fas', iconName: 'user' }
	}
}));

jest.mock('@fortawesome/free-brands-svg-icons', () => ({
	fab: {
		faGithub: { prefix: 'fab', iconName: 'github' },
		faTwitter: { prefix: 'fab', iconName: 'twitter' },
		faFacebook: { prefix: 'fab', iconName: 'facebook' },
		faYandex: { prefix: 'fab', iconName: 'yandex' }
	}
}));

describe('Font Awesome Service', () => {
	describe('getIconVisibleName', () => {
		it('should return a pretty-looking name', () => {
			expect(FontAwesomeService.getIconVisibleName('foo')).toEqual('Foo');
			expect(FontAwesomeService.getIconVisibleName('john-doe')).toEqual('John doe');
		});
	});

	describe('getIconList', () => {
		beforeEach(() => {
			FontAwesomeService.resetCache();
		});

		it('should return a list of filtered and formatted icons', () => {
			const expectedSolidIcons = [
				{
					fullName: 'faHouse',
					visibleName: 'House',
					prefix: 'fas',
					iconName: 'house'
				},
				{
					fullName: 'faMagnifyingGlass',
					visibleName: 'Magnifying glass',
					prefix: 'fas',
					iconName: 'magnifying-glass'
				},
				{
					fullName: 'faUser',
					visibleName: 'User',
					prefix: 'fas',
					iconName: 'user'
				}
			];

			const expectedBrandIcons = [
				{
					fullName: 'faGithub',
					visibleName: 'Github',
					prefix: 'fab',
					iconName: 'github'
				},
				{
					fullName: 'faTwitter',
					visibleName: 'Twitter',
					prefix: 'fab',
					iconName: 'twitter'
				},
				{
					fullName: 'faFacebook',
					visibleName: 'Facebook',
					prefix: 'fab',
					iconName: 'facebook'
				}
			];

			const result = FontAwesomeService.getIconList();

			expect(result).toEqual([...expectedSolidIcons, ...expectedBrandIcons]);
		});

		it('should not contain ignored brands (e.g. Yandex)', () => {
			const result = FontAwesomeService.getIconList();
			expect(result).not.toContainEqual({
				fullName: 'faYandex',
				visibleName: 'Yandex',
				prefix: 'fab',
				iconName: 'yandex'
			});
		});

		it('should use the cache on reuse', () => {
			const initialResult = FontAwesomeService.getIconList();
			const cachedResult = FontAwesomeService.getIconList();
			expect(initialResult).toBe(cachedResult);
		});
	});
});
