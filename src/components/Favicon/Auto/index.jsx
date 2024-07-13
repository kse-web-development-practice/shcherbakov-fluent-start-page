import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FaviconGrabberService from '../../../services/FaviconGrabberService';
import UrlService from '../../../services/UrlService';

const FaviconAuto = ({ websiteUrl, ...props }) => {
	const [faviconUrl, setFaviconUrl] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!UrlService.isValid(websiteUrl)) {
			setIsLoading(false);
			return;
		}

		FaviconGrabberService.tryAllPossibleCases(websiteUrl)
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
