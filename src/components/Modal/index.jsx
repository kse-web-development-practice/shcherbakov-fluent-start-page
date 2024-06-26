import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import styles from './modal.module.scss';

const Modal = ({ title, footer, onClose, children }) => {
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

	return (
		<div className={styles.modal} onClick={(event) => console.log(event)}>
			<div className={styles.modalBody} onClick={(event) => event.stopPropagation()}>
				<div className={styles.modalHeader}>
					<CloseButton />
					{title}
				</div>
				<div className={styles.modalContent}>{children}</div>
				{footer && <div className={styles.modalFooter}>{footer}</div>}
			</div>
		</div>
	);
};

Modal.propTypes = {
	title: PropTypes.string,
	footer: PropTypes.element,
	children: PropTypes.element,
	onClose: PropTypes.func
};

export default Modal;
