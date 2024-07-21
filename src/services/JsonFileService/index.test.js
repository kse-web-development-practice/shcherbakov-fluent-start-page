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

	describe('read', () => {
		describe('if file type is application/json and contains valid content inside', () => {
			it('should resolve with parsed data', async () => {
				const expectedData = { foo: 'bar' };
				const file = new Blob([JSON.stringify(expectedData)], { type: 'application/json' });
				await expect(JsonFileService.read(file)).resolves.toEqual(expectedData);
			});
		});

		describe('if file type is not application/json', () => {
			it('should reject with an error', async () => {
				const file = new Blob(['Hello world'], { type: 'plain/text' });
				await expect(JsonFileService.read(file)).rejects.toThrow('Wrong file type: must be JSON');
			});
		});

		describe('if file content is invalid JSON', () => {
			it('should reject with an error', async () => {
				const file = new Blob(['Hello world'], { type: 'application/json' });
				await expect(JsonFileService.read(file)).rejects.toThrow('Invalid JSON');
			});
		});
	});
});
