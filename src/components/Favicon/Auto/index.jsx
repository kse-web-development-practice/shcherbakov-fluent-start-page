import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFaviconGrabbers from './hooks/useFaviconGrabbers';

const FaviconAuto = ({ url }) => {
	const [faviconUrl, setFaviconUrl] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { getFaviconWithChromeExtensionApi, getFaviconWithDuckDuckGo, getFaviconFromWebsite } = useFaviconGrabbers();

	useEffect(() => {
		Promise.any([
			getFaviconWithChromeExtensionApi(url),
			getFaviconWithDuckDuckGo(url),

			getFaviconFromWebsite(url, 'favicon.ico'),
			getFaviconFromWebsite(url, 'favicon.svg'),
			getFaviconFromWebsite(url, 'apple-touch-icon.png'),
			getFaviconFromWebsite(url, 'favicon-32x32.png'),
			getFaviconFromWebsite(url, 'favicon-48x48.png'),
			getFaviconFromWebsite(url, 'favicon-64x64.png'),
			getFaviconFromWebsite(url, 'favicon-167x167.png'),
			getFaviconFromWebsite(url, 'favicon-180x180.png'),
			getFaviconFromWebsite(url, 'favicon-192x192.png')
		])
			.then((favicon) => {
				setFaviconUrl(favicon);
				// TODO: save a favicon's url in LocalStorage for quicker loading and reducing an amount of requests
			})
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return <p>loading...</p>;
	}

	if (faviconUrl === null) {
		return null;
	}

	return <img src={faviconUrl} alt={url} />;
};

FaviconAuto.propTypes = {
	url: PropTypes.string.isRequired
};

export default FaviconAuto;
