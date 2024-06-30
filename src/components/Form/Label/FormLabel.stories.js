import React from 'react';
import FormLabel from '.';

export default {
	title: 'Form/Label',
	component: FormLabel,
	tags: ['autodocs']
};

export const TextInput = {
	args: {
		label: 'Text input',
		children: <input />
	}
};

export const Select = {
	args: {
		label: 'Select field',
		children: (
			<select>
				<option>Option 1</option>
				<option>Option 2</option>
				<option>Option 3</option>
			</select>
		)
	}
};

export const RequiredField = {
	args: {
		label: 'Input but required to fill',
		required: true,
		children: <input />
	}
};

export const FieldWithError = {
	args: {
		label: 'Something is wrong here',
		children: <input />,
		error: {
			message: 'Error message'
		}
	}
};
