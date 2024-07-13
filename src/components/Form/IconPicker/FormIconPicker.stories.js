import { fn } from '@storybook/test';
import FormIconPicker from '.';

export default {
	title: 'Form/Icon Picker',
	component: FormIconPicker
};

export const IconPicker = {
	args: {
		onPick: fn()
	}
};
