import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas);
library.add(far);
library.add(fab);

const FaviconIcon = ({ iconStyle = 'fas', name, ...props }) => {
	if (!iconStyle || !name) {
		return null;
	}

	return <FontAwesomeIcon icon={[iconStyle, name]} {...props} />;
};

FaviconIcon.propTypes = {
	iconStyle: PropTypes.oneOf(['fas', 'far', 'fab']),

	/**
	 * Font Awesome favicon name
	 */
	name: PropTypes.string.isRequired
};

export default FaviconIcon;
