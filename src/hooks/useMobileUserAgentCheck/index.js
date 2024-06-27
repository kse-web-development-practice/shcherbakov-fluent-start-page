const useMobileUserAgentCheck = () => {
	const mobileUserAgentRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
	return mobileUserAgentRegex.test(navigator.userAgent);
};

export default useMobileUserAgentCheck;
