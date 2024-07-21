import React, { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import RadioGroup from '../../RadioGroup';
import FormFileImport from '../../FileImport';
import JsonFileService from '../../../../services/JsonFileService';
import { AppDataContext } from '../../../../contexts/AppData';

const FormAppSettings = () => {
	const { register, watch } = useFormContext();
	const { dispatch } = useContext(AppDataContext);

	const watchTheme = watch('theme');
	useEffect(() => {
		dispatch({
			type: 'UPDATE_SETTINGS',
			payload: {
				theme: watchTheme
			}
		});
	}, [watchTheme]);

	return (
		<>
			<h2>Theme</h2>
			<RadioGroup label="Mode">
				<label>
					<input type="radio" value="light" {...register('theme')} />
					Light
				</label>
				<label>
					<input type="radio" value="dark" {...register('theme')} />
					Dark
				</label>
				<label>
					<input type="radio" value="auto" {...register('theme')} />
					Automatic - the system's Dark or Light mode
				</label>
			</RadioGroup>

			<h2>Data</h2>
			<FormFileImport />
			<button type="button" onClick={() => JsonFileService.download('settings', { str: 'TODO' })}>
				Export
			</button>
			<button type="button">Clear</button>
		</>
	);
};

export default FormAppSettings;
