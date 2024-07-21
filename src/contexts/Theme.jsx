import React, { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppDataContext } from './AppData';

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
	const { state } = useContext(AppDataContext);
	const autoDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
	const theme = state.settings.theme === 'auto' ? autoDarkMode : state.settings.theme;

	useEffect(() => {
		document.body.classList.remove('light', 'dark');
		document.body.classList.add(theme);
	}, [theme]);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				themeCapitalized: theme.charAt(0).toUpperCase() + theme.slice(1) // Used for easier usage in className because styles are imported like "componentNameThemeWhite" or `componentNameTheme${themeCapitalized}`
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

ThemeProvider.propTypes = {
	children: PropTypes.element
};

export default ThemeProvider;
