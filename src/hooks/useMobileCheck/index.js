/**
 * Check the user agent if it is mobile
 * @returns {boolean}
 */
const useMobileCheck = () => {
	const mobileUserAgentRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	return mobileUserAgentRegex.test(navigator.userAgent);
};

export default useMobileCheck;
