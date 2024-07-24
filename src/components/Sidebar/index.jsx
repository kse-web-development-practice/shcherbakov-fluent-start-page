import React from 'react';
import PropTypes from 'prop-types';
import SidebarItem from './Item';
import styles from './sidebar.module.scss';

const Sidebar = ({ items = [], renderItem = (props, index) => <SidebarItem key={index} {...props} /> }) => {
	return (
		<aside className={styles.sidebar}>
			<nav className={styles.sidebarNavigation}>{items.map((item, index) => renderItem(item, index))}</nav>
		</aside>
	);
};

Sidebar.propTypes = {
	renderItem: PropTypes.func,
	items: PropTypes.arrayOf(PropTypes.shape(SidebarItem.propTypes))
};

export default Sidebar;
