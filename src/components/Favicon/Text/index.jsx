import React from 'react';
import PropTypes from 'prop-types';

const FaviconText = ({ text = '...', ...props }) => <span {...props}>{text}</span>;

FaviconText.propTypes = {
	text: PropTypes.string
};

export default FaviconText;
