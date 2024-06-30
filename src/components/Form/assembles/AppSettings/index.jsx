import React from 'react';
import { useFormContext } from 'react-hook-form';
import RadioGroup from '../../RadioGroup';
import FormFileImport from '../../FileImport';
import useJsonExport from '../../../../hooks/useJsonExport';

const FormAppSettings = () => {
	const { register } = useFormContext();
	const exportAppSettings = useJsonExport();

	return (
		<>
			<h2>Theme</h2>
			<RadioGroup label="Mode">
				<label>
					<input type="radio" value="light" {...register('theme.mode')} />
					Light
				</label>
				<label>
					<input type="radio" value="dark" {...register('theme.mode')} />
					Dark
				</label>
				<label>
					<input type="radio" value="system" {...register('theme.mode')} />
					Automatic - the system's Dark or Light mode
				</label>
			</RadioGroup>

			<h2>Data</h2>
			<FormFileImport />
			<button type="button" onClick={() => exportAppSettings('settings', { str: 'TODO' })}>
				Export
			</button>
			<button type="button">Clear</button>
		</>
	);
};

export default FormAppSettings;
