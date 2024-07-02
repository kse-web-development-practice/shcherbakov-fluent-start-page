import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const ViewAppSettings = () => {
	const navigate = useNavigate();

	const handleModalClose = () => {
		navigate(-1);
	};

	return (
		<Modal title="Settings" isVisible onClose={handleModalClose}>
			TODO
		</Modal>
	);
};

export default ViewAppSettings;
