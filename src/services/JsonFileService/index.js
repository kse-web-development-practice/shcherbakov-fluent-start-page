class JsonFileService {
	static download(outputFilename, content) {
		const encodedContent = encodeURIComponent(JSON.stringify(content, null, 2));
		const dataString = `data:text/json;charset=utf-8,${encodedContent}`;
		const downloadAnchorNode = document.createElement('a');

		downloadAnchorNode.setAttribute('href', dataString);
		downloadAnchorNode.setAttribute('download', `${outputFilename}.json`);

		document.body.appendChild(downloadAnchorNode);
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	}

	static async read(file) {
		return new Promise((resolve, reject) => {
			if (file.type !== 'application/json') {
				return reject(new Error('Wrong file type: must be JSON'));
			}

			const reader = new FileReader();
			reader.onload = () => {
				try {
					const parsedData = JSON.parse(reader.result);
					resolve(parsedData);
				} catch (error) {
					reject(new Error('Invalid JSON'));
				}
			};
			reader.readAsText(file);
		});
	}
}

export default JsonFileService;
