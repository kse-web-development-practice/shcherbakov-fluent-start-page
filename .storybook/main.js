/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-webpack5-compiler-swc',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-styling-webpack',
			options: {
				rules: [
					{
						test: /\.(sa|sc|c)ss$/i,
						use: [
							'style-loader',
							{
								loader: 'css-loader',
								options: {
									importLoaders: 1,
									esModule: false
								}
							},
							'postcss-loader',
							'sass-loader'
						]
					}
				]
			}
		}
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {}
	}
};
export default config;
