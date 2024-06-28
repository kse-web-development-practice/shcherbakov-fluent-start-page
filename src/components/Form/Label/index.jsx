import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './label.module.scss';

const FormLabel = ({ label, required, error, vertical, as = 'a', children }) => {
	const WrapperComponent = as;
	return (
		<div className={classNames(styles.formLabel, { [styles.formLabelError]: error })}>
			<WrapperComponent className={classNames(styles.formLabelBody, { [styles.formLabelVertical]: vertical })}>
				<span className={styles.formLabelTitle}>
					{label}
					{required && <span className={styles.formLabelRequiredMark}>*</span>}
				</span>
				{children}
			</WrapperComponent>
			{error && (
				<span className={styles.formLabelErrorMessage} role="alert">
					{error.message}
				</span>
			)}
		</div>
	);
};

FormLabel.propTypes = {
	label: PropTypes.string.isRequired,
	required: PropTypes.bool,
	error: PropTypes.shape({ message: PropTypes.string.isRequired }),
	vertical: PropTypes.bool,
	as: PropTypes.string,
	children: PropTypes.element
};

export default FormLabel;
