import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/gridstack-extra.min.css';
import '../src/assets/styles/styles.scss';
import AppDataProvider from '../src/contexts/AppData';
import defaultData from '../src/constants/defaultData';

// Load Font Awesome icons
library.add(fas);
library.add(fab);

/** @type { import('@storybook/react').Preview } */
const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	},
	decorators: [
		(Story) => (
			<AppDataProvider useStorage={false} initialData={{ ...defaultData, settings: { theme: 'light' } }}>
				<Story />
			</AppDataProvider>
		)
	]
};

export default preview;
