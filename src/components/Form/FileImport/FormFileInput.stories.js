import { fn } from '@storybook/test';
import FormFileImport from '.';

export default {
	title: 'Form/File Import',
	component: FormFileImport
};

export const FileImport = {
	args: {
		onChange: fn()
	}
};
