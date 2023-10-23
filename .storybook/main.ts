import type { StorybookConfig } from '@storybook/nextjs'

const path = require('path')

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		path.resolve('./.storybook/vanilla-extract.js'),
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions'
	],
	framework: {
		name: '@storybook/nextjs',
		options: {}
	},
	docs: {
		autodocs: 'tag'
	},
	// https://github.com/storybookjs/storybook/issues/18557
	webpackFinal: async config => {
		const imageRule = config.module?.rules?.find(rule => {
			const test = (rule as { test: RegExp }).test

			if (!test) {
				return false
			}

			return test.test('.svg')
		}) as { [key: string]: any }

		imageRule.exclude = /\.svg$/

		config.module?.rules?.push({
			test: /\.svg$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						svgoConfig: {
							plugins: [
								{
									name: 'preset-default',
									params: {
										overrides: {
											removeViewBox: false
										}
									}
								}
							]
						}
					}
				}
			]
		})

		return config
	}
}
export default config
