import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './label.module.scss';

const FormLabel = ({ label, required, error, vertical, children }) => {
	return (
		<div className={classNames(styles.formLabel, { [styles.formLabelError]: error })}>
			<label className={classNames(styles.formLabelBody, { [styles.formLabelVertical]: vertical })}>
				<span className={styles.formLabelTitle}>
					{label}
					{required && <span className={styles.formLabelRequiredMark}>*</span>}
				</span>
				{children}
			</label>
			{error && (
				<span className={styles.formLabelErrorMessage} role="alert">
					{error}
				</span>
			)}
		</div>
	);
};

FormLabel.propTypes = {
	label: PropTypes.string.isRequired,
	required: PropTypes.bool,
	error: PropTypes.string,
	vertical: PropTypes.bool,
	children: PropTypes.element
};

export default FormLabel;
