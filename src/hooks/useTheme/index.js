import { useContext } from 'react';
import { AppDataContext } from '../../contexts/AppData';

/**
 * A simple shortcut to AppDataContext's state.settings.theme.
 * Also checks if user has an automatic color theme
 * @param {boolean} isFirstLetterCapital Capitalize the first letter of an output. Used in className because styles are imported like "componentNameThemeWhite"
 * @returns {string}
 */
const useTheme = (isFirstLetterCapital = true) => {
	const { state } = useContext(AppDataContext);
	const autoDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
	const theme = state.settings.theme === 'auto' ? autoDarkMode : state.settings.theme;

	if (isFirstLetterCapital) {
		return theme.charAt(0).toUpperCase() + theme.slice(1);
	}

	return theme;
};

export default useTheme;
