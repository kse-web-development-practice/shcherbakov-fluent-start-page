import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FaviconIcon = ({ iconStyle = 'fas', name = 'bug', ...props }) => {
	if (!iconStyle || !name) {
		return null;
	}

	return <FontAwesomeIcon icon={[iconStyle, name]} {...props} />;
};

FaviconIcon.propTypes = {
	iconStyle: PropTypes.oneOf(['fas', 'fab']),

	/**
	 * Font Awesome favicon name
	 */
	name: PropTypes.string
};

export default FaviconIcon;
