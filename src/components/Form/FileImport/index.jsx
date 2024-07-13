import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useMobileUserAgentCheck from '../../../hooks/useMobileUserAgentCheck';
import styles from './file-import.module.scss';

const FormFileImport = ({ onChange, accepts = ['.json', 'application/json'], allowDragAndDrop = true }) => {
	const fileInputRef = useRef(null);
	const isMobile = useMobileUserAgentCheck();

	const handleDragOver = (event) => {
		if (!allowDragAndDrop) {
			return;
		}

		event.preventDefault();
	};

	const handleDrop = (event) => {
		if (!allowDragAndDrop) {
			return;
		}

		event.preventDefault();

		const files = [...event.dataTransfer.files].filter((file) => accepts.includes(file.type));
		if (files.length === 0) {
			return;
		}

		onChange?.(files);
	};

	const handleImportButtonClick = () => {
		if (!fileInputRef.current) {
			return;
		}

		fileInputRef.current.click();
	};

	const handleFileInputChange = (event) => {
		onChange?.([...event.target.files]);
	};

	return (
		<div
			className={classNames(styles.fileImport, {
				[styles.fileImportDragAndDrop]: allowDragAndDrop && !isMobile
			})}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<p className={styles.fileImportText}>Drag&Drop or</p>
			<button type="button" onClick={handleImportButtonClick}>
				Import
			</button>
			<input ref={fileInputRef} hidden type="file" accept={accepts.join(',')} onChange={handleFileInputChange} />
		</div>
	);
};

FormFileImport.propTypes = {
	accepts: PropTypes.arrayOf(PropTypes.string),
	allowDragAndDrop: PropTypes.bool,
	inputProps: PropTypes.object,
	onChange: PropTypes.func
};

export default FormFileImport;
