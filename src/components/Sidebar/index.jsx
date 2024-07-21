import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SidebarItem from './Item';
import styles from './sidebar.module.scss';
import useTheme from '../../hooks/useTheme';

const Sidebar = ({ items = [], renderItem = (props, index) => <SidebarItem key={index} {...props} /> }) => {
	const theme = useTheme();

	return (
		<aside className={classNames(styles.sidebar, styles[`sidebarTheme${theme}`])}>
			<nav className={styles.sidebarNavigation}>{items.map((item, index) => renderItem(item, index))}</nav>
		</aside>
	);
};

Sidebar.propTypes = {
	renderItem: PropTypes.func,
	items: PropTypes.arrayOf(PropTypes.shape(SidebarItem.propTypes))
};

export default Sidebar;
