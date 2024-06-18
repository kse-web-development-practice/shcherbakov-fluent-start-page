import React from 'react';
import PropTypes from 'prop-types';
import FaviconAuto from './Auto';

const Favicon = ({ type }) => {
	switch (type) {
		case 'auto':
			return <FaviconAuto />;

		case 'none':
			return null;

		default:
			return <p>Not supported</p>;
	}
};

Favicon.defaultProps = {
	type: 'none'
};

Favicon.propTypes = {
	type: PropTypes.oneOf(['none', 'image', 'text', 'icon', 'auto'])
};

export default Favicon;