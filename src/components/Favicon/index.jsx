import React from 'react';
import PropTypes from 'prop-types';
import FaviconAuto from './Auto';
import FaviconIcon from './Icon';

const Favicon = ({ type = 'none', ...props }) => {
	switch (type) {
		case 'icon':
			return <FaviconIcon {...props} />;

		case 'auto':
			return <FaviconAuto {...props} />;

		case 'none':
			return null;

		default:
			return <p>Not supported</p>;
	}
};

Favicon.propTypes = {
	type: PropTypes.oneOf(['none', 'image', 'text', 'icon', 'auto'])
};

export default Favicon;
