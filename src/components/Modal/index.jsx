import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import styles from './modal.module.scss';

const Modal = ({ title, footer, onClose, children, isVisible = false }) => {
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				onClose?.(event);
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	const CloseButton = () => (
		<button onClick={onClose} className={styles.modalCloseButton} aria-label="Close modal">
			<span className={styles.modalCloseButtonMobile} aria-hidden>
				<FontAwesomeIcon icon={faArrowLeft} size="xl" />
			</span>
			<span className={styles.modalCloseButtonDesktop} aria-hidden>
				<FontAwesomeIcon icon={faClose} size="xl" />
			</span>
		</button>
	);

	if (!isVisible) {
		return null;
	}

	return (
		<div className={styles.modal} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
			<div className={styles.modalBody} onClick={(event) => event.stopPropagation()}>
				<div className={styles.modalHeader}>
					<CloseButton />
					<span id="modal-title">{title}</span>
				</div>
				<div className={styles.modalContent}>{children}</div>
				{footer && <div className={styles.modalFooter}>{footer}</div>}
			</div>
		</div>
	);
};

Modal.propTypes = {
	title: PropTypes.string.isRequired,
	footer: PropTypes.element,
	children: PropTypes.element,
	onClose: PropTypes.func,
	isVisible: PropTypes.bool
};

export default Modal;
