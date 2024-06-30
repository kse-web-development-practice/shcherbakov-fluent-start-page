import React from 'react';
import PropTypes from 'prop-types';
import FaviconAuto from './Auto';
import FaviconIcon from './Icon';
import FaviconText from './Text';
import FaviconImage from './Image';

const Favicon = ({ type, ...props }) => {
	switch (type) {
		case 'icon':
			return <FaviconIcon {...props} />;

		case 'auto':
			return <FaviconAuto {...props} />;

		case 'text':
			return <FaviconText {...props} />;

		case 'image':
			return <FaviconImage {...props} />;

		case 'none':
		default:
			return null;
	}
};

Favicon.propTypes = {
	type: PropTypes.oneOf([null, 'none', 'icon', 'auto', 'text', 'image'])
};

export default Favicon;
