import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.scss';

const SidebarItem = ({ label, icon, linkTo }) => {
	return (
		<Link to={linkTo} className={styles.sidebarItem}>
			<FontAwesomeIcon icon={icon} className={styles.sidebarItemIcon} />
			<span className={styles.sidebarItemLabel}>{label}</span>
		</Link>
	);
};

SidebarItem.propTypes = {
	label: PropTypes.string.isRequired,

	/**
	 * Font Awesome's IconProp
	 */
	icon: PropTypes.any.isRequired,

	linkTo: PropTypes.string
};

export default SidebarItem;
