import PropTypes from 'prop-types';

const FaviconText = ({ text = '...' }) => text;

FaviconText.propTypes = {
	text: PropTypes.string
};

export default FaviconText;
