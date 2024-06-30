import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FormAppSettings from '.';

export default {
	title: 'Form/Assembles/App Settings',
	component: FormAppSettings,
	decorators: [
		(Story) => {
			const methods = useForm({
				defaultValues: {
					theme: {
						mode: 'dark'
					}
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
