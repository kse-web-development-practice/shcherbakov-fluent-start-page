import React from 'react';
import PropTypes from 'prop-types';
import FaviconAuto from './Auto';
import FaviconIcon from './Icon';
import FaviconText from './Text';
import FaviconImage from './Image';

const Favicon = ({ type, data, className }) => {
	switch (type) {
		case 'icon':
			return <FaviconIcon {...data} className={className} />;

		case 'auto':
			return <FaviconAuto {...data} className={className} />;

		case 'text':
			return <FaviconText {...data} className={className} />;

		case 'image':
			return <FaviconImage {...data} className={className} />;

		case 'none':
		default:
			return null;
	}
};

Favicon.propTypes = {
	type: PropTypes.oneOf([null, 'none', 'icon', 'auto', 'text', 'image']),
	data: PropTypes.oneOfType([
		PropTypes.shape(FaviconAuto.propTypes),
		PropTypes.shape(FaviconIcon.propTypes),
		PropTypes.shape(FaviconText.propTypes),
		PropTypes.shape(FaviconImage.propTypes)
	]),
	className: PropTypes.string
};

export default Favicon;
