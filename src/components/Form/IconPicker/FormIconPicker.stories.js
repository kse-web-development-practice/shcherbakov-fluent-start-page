import { fn } from '@storybook/test';
import FormIconPicker from '.';

export default {
	title: 'Form/IconPicker',
	component: FormIconPicker
};

export const IconPicker = {
	args: {
		onPick: fn()
	}
};
