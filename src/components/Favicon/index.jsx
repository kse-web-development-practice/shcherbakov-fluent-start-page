import React from 'react';
import PropTypes from 'prop-types';
import FaviconAuto from './Auto';
import FaviconIcon from './Icon';
import FaviconText from './Text';
import FaviconImage from './Image';

const Favicon = ({ type = null, ...props }) => {
	switch (type) {
		case 'icon':
			return <FaviconIcon {...props} />;

		case 'auto':
			return <FaviconAuto {...props} />;

		case 'text':
			return <FaviconText {...props} />;

		case 'image':
			return <FaviconImage {...props} />;

		default:
			return null;
	}
};

Favicon.propTypes = {
	type: PropTypes.oneOf([null, 'icon', 'auto', 'text', 'image'])
};

export default Favicon;
