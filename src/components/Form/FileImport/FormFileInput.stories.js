import FormFileImport from '.';
import { fn } from '@storybook/test';

export default {
	title: 'Form/File Import',
	component: FormFileImport
};

export const FileImport = {
	args: {
		onChange: fn()
	}
};
