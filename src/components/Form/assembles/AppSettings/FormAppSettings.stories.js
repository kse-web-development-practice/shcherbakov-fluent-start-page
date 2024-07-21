import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useTheme from '../../../../hooks/useTheme';
import FormAppSettings from '.';

export default {
	title: 'Form/Assembles/App Settings',
	component: FormAppSettings,
	decorators: [
		(Story) => {
			const theme = useTheme(false);
			const methods = useForm({
				defaultValues: {
					theme
				}
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
