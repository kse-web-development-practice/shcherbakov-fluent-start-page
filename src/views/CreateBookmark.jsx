import React from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const ViewCreateBookmark = () => {
	const navigate = useNavigate();

	const handleModalClose = () => {
		navigate(-1);
	};

	return (
		<Modal title="Create a new bookmark" isVisible onClose={handleModalClose}>
			TODO
		</Modal>
	);
};

export default ViewCreateBookmark;
