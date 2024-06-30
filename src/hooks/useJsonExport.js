const useJsonExport = () => (outputFilename, content) => {
	const encodedContent = encodeURIComponent(JSON.stringify(content, null, 2));
	const dataString = `data:text/json;charset=utf-8,${encodedContent}`;
	const downloadAnchorNode = document.createElement('a');

	downloadAnchorNode.setAttribute('href', dataString);
	downloadAnchorNode.setAttribute('download', `${outputFilename}.json`);

	document.body.appendChild(downloadAnchorNode);
	downloadAnchorNode.click();
	downloadAnchorNode.remove();
};

export default useJsonExport;
