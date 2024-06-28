import React from 'react';
import RadioGroup from '.';

export default {
	title: 'Form/Radio Group',
	component: RadioGroup,
	tags: ['autodocs']
};

export const Sample = {
	args: {
		label: 'Sample radio group',
		children: (
			<>
				<label>
					<input type="radio" value="none" name="group" />
					Option 1
				</label>
				<label>
					<input type="radio" value="icon" name="group" />
					Option 2
				</label>
				<label>
					<input type="radio" value="auto" name="group" />
					Option 3
				</label>
				<label>
					<input type="radio" value="text" name="group" />
					Option 4
				</label>
			</>
		)
	}
};
