import React, { useState } from 'react';
import { fn } from '@storybook/test';
import Modal from '.';

export default {
	title: 'Modal',
	component: Modal,
	parameters: {
		layout: 'fullscreen'
	}
};

export const Mobile = {
	args: {
		title: 'Modal title',
		onClose: fn(),
		isVisible: true,
		children: <p>Content</p>,
		footer: <button>Close</button>
	},
	parameters: {
		viewport: {
			defaultViewport: 'mobile1'
		},
		options: {
			panelPosition: 'right',
			rightPanelWidth: 400,
			bottomPanelHeight: 0
		}
	}
};

export const Desktop = {
	args: {
		title: 'Modal title',
		onClose: fn(),
		isVisible: true,
		children: <p>Content</p>,
		footer: <button>Close</button>
	},
	parameters: {
		viewport: {
			defaultViewport: 'responsive'
		},
		options: {
			panelPosition: 'bottom',
			bottomPanelHeight: 300
		}
	}
};

export const WithoutFooter = {
	args: {
		title: 'Modal without footer',
		onClose: fn(),
		isVisible: true,
		children: <p>Content</p>
	}
};

export const ShowOnButtonClick = {
	decorators: [
		() => {
			const [isModalVisible, setIsModalVisible] = useState(false);
			return (
				<>
					<button onClick={() => setIsModalVisible(true)}>Show modal</button>
					<Modal title="Test modal" onClose={() => setIsModalVisible(false)} isVisible={isModalVisible}>
						<>Click the backdrop or press Escape or click the close button to close this modal</>
					</Modal>
				</>
			);
		}
	],
	parameters: {
		viewport: {
			defaultViewport: 'responsive'
		},
		options: {
			rightPanelWidth: 0,
			bottomPanelHeight: 0
		}
	}
};
