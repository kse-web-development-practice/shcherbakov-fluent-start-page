import React from 'react';
import { fn } from '@storybook/test';
import Modal from '.';

export default {
	title: 'Modal',
	component: Modal,
	parameters: {
		layout: 'fullscreen'
	},
	tags: ['autodocs']
};

export const Mobile = {
	args: {
		title: 'Modal title',
		onClose: fn(),
		children: <p>Content</p>,
		footer: <button>Close</button>
	},
	parameters: {
		viewport: {
			defaultViewport: 'mobile1'
		}
	}
};

export const Desktop = {
	args: {
		title: 'Modal title',
		onClose: fn(),
		children: <p>Content</p>,
		footer: <button>Close</button>
	},
	parameters: {
		viewport: {
			defaultViewport: 'responsive'
		}
	}
};
