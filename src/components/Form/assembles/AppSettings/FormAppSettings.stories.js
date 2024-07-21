import React, { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AppDataContext } from '../../../../contexts/AppData';
import FormAppSettings from '.';

export default {
	title: 'Form/Assembles/App Settings',
	component: FormAppSettings,
	decorators: [
		(Story) => {
			const { state } = useContext(AppDataContext);
			const methods = useForm({
				defaultValues: state.settings
			});

			return (
				<FormProvider {...methods}>
					<form>
						<Story />
					</form>
				</FormProvider>
			);
		}
	]
};

export const AppSettings = {};
