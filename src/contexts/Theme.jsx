import React, { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppDataContext } from './AppData';

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
	const { state } = useContext(AppDataContext);
	const autoDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
	const theme = state.settings.theme === 'auto' ? autoDarkMode : state.settings.theme;

	useEffect(() => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
	}, [theme]);

	return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
	children: PropTypes.element
};

export default ThemeProvider;
