import React from 'react';
import PropTypes from 'prop-types';

const FaviconImage = ({ url, ...props }) => <img src={url} alt={url} style={{ color: 'transparent' }} {...props} />;

FaviconImage.propTypes = {
	url: PropTypes.string
};

export default FaviconImage;
