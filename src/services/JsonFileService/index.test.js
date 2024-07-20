import JsonFileService from '.';

describe('JSON File Service', () => {
	describe('download', () => {
		it('should work', () => {
			const linkMock = {
				href: '',
				download: '',
				click: jest.fn(),
				setAttribute: jest.fn(),
				remove: jest.fn()
			};
			const createElementSpy = jest.spyOn(document, 'createElement').mockReturnValueOnce(linkMock);
			document.body.appendChild = jest.fn();

			const inputData = { foo: 'bar' };
			const expectedFilename = 'test';
			const expectedData = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(inputData, null, 2))}`;
			JsonFileService.download(expectedFilename, inputData);

			expect(createElementSpy).toHaveBeenCalledWith('a');
			expect(linkMock.setAttribute).toHaveBeenCalledWith('href', expectedData);
			expect(linkMock.setAttribute).toHaveBeenCalledWith('download', `${expectedFilename}.json`);
			expect(document.body.appendChild).toHaveBeenCalledWith(linkMock);
			expect(linkMock.click).toHaveBeenCalled();
			expect(linkMock.remove).toHaveBeenCalled();
		});
	});
});
