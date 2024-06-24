import PropTypes from 'prop-types';

const FaviconText = ({ text = '...' }) => {
	return text;
};

FaviconText.propTypes = {
	text: PropTypes.string
};

export default FaviconText;
