import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useFaviconGrabbers from './hooks/useFaviconGrabbers';
import UrlService from '../../../services/UrlService';

const FaviconAuto = ({ websiteUrl, ...props }) => {
	const [faviconUrl, setFaviconUrl] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { getFaviconWithChromeExtensionApi, getFaviconWithDuckDuckGo, getFaviconFromWebsite } = useFaviconGrabbers();

	useEffect(() => {
		if (!UrlService.isValid(websiteUrl)) {
			setIsLoading(false);
			return;
		}

		Promise.any([
			getFaviconWithChromeExtensionApi(websiteUrl),
			getFaviconWithDuckDuckGo(websiteUrl),

			getFaviconFromWebsite(websiteUrl, 'favicon.ico'),
			getFaviconFromWebsite(websiteUrl, 'favicon.svg'),
			getFaviconFromWebsite(websiteUrl, 'apple-touch-icon.png'),
			getFaviconFromWebsite(websiteUrl, 'favicon-32x32.png'),
			getFaviconFromWebsite(websiteUrl, 'favicon-48x48.png'),
			getFaviconFromWebsite(websiteUrl, 'favicon-64x64.png'),
			getFaviconFromWebsite(websiteUrl, 'favicon-167x167.png'),
			getFaviconFromWebsite(websiteUrl, 'favicon-180x180.png'),
			getFaviconFromWebsite(websiteUrl, 'favicon-192x192.png')
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

	if (!faviconUrl) {
		return null;
	}

	return <img src={faviconUrl} alt={websiteUrl} style={{ color: 'transparent' }} {...props} />;
};

FaviconAuto.propTypes = {
	websiteUrl: PropTypes.string
};

export default FaviconAuto;
