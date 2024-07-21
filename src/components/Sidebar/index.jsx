import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SidebarItem from './Item';
import styles from './sidebar.module.scss';
import { ThemeContext } from '../../contexts/Theme';

const Sidebar = ({ items = [], renderItem = (props, index) => <SidebarItem key={index} {...props} /> }) => {
	const { themeCapitalized } = useContext(ThemeContext);

	return (
		<aside className={classNames(styles.sidebar, styles[`sidebarTheme${themeCapitalized}`])}>
			<nav className={styles.sidebarNavigation}>{items.map((item, index) => renderItem(item, index))}</nav>
		</aside>
	);
};

Sidebar.propTypes = {
	renderItem: PropTypes.func,
	items: PropTypes.arrayOf(PropTypes.shape(SidebarItem.propTypes))
};

export default Sidebar;
