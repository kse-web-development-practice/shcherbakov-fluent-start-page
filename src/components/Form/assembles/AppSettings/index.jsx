import React, { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import RadioGroup from '../../RadioGroup';
import FormFileImport from '../../FileImport';
import JsonFileService from '../../../../services/JsonFileService';
import { AppDataContext } from '../../../../contexts/AppData';
import defaultData from '../../../../constants/defaultData';

const FormAppSettings = () => {
	const { register, watch } = useFormContext();
	const { state, dispatch } = useContext(AppDataContext);

	const watchTheme = watch('theme');
	useEffect(() => {
		dispatch({
			type: 'UPDATE_SETTINGS',
			payload: {
				theme: watchTheme
			}
		});
	}, [watchTheme]);

	const handleExportData = () => {
		const date = new Date().toISOString().split('T')[0];
		JsonFileService.download(`fluent-start-page_${date}`, state);
	};

	const handleImportData = ([file]) => {
		JsonFileService.read(file)
			.then((data) => {
				if (!data.settings || !data.groups) {
					alert('Invalid data: no settings and/or bookmark groups');
					return;
				}

				dispatch({
					type: 'SET_DATA',
					payload: data
				});
			})
			.catch(alert);
	};

	const handleClearData = () => {
		dispatch({
			type: 'SET_DATA',
			payload: defaultData
		});
	};

	return (
		<>
			<h2>Theme</h2>
			<RadioGroup label="Mode">
				<>
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
				</>
			</RadioGroup>

			<h2>Data</h2>
			<FormFileImport onChange={handleImportData} />
			<button type="button" onClick={handleExportData}>
				Export
			</button>
			<button type="button" onClick={handleClearData}>
				Clear
			</button>
		</>
	);
};

export default FormAppSettings;
