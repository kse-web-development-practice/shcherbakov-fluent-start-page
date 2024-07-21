import React, { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import { AppDataContext } from '../contexts/AppData';
import FormAppSettings from '../components/Form/assembles/AppSettings';

const ViewAppSettings = () => {
	const { state } = useContext(AppDataContext);

	const navigate = useNavigate();
	const form = useForm({ values: state.settings });

	const handleModalClose = () => {
		navigate(-1);
	};

	return (
		<Modal title="Settings" isVisible onClose={handleModalClose}>
			<FormProvider {...form}>
				<form>
					<FormAppSettings />
				</form>
			</FormProvider>
		</Modal>
	);
};

export default ViewAppSettings;
