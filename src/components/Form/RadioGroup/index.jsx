import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '../Label';
import styles from './radio-group.module.scss';

const RadioGroup = ({ children, ...labelProps }) => (
	<FormLabel as="div" vertical {...labelProps}>
		<div className={styles.radioGroup}>{children}</div>
	</FormLabel>
);

RadioGroup.propTypes = {
	label: PropTypes.string.isRequired,
	required: PropTypes.bool,
	error: PropTypes.shape({ message: PropTypes.string.isRequired }),
	children: PropTypes.element
};

export default RadioGroup;
