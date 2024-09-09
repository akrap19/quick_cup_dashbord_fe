/* eslint-disable */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true'
})

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin()

const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['via.placeholder.com', 'storage.googleapis.com']
	},
	// TODO: remove this
	// https://nextjs.org/docs/app/api-reference/next-config-js/appDir
	// We're using next14^
	// experimental: {
	// 	appDir: true
	// },
	webpack(config) {
		config.module.rules.push({
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
	},
	output: 'standalone'
}

module.exports = withVanillaExtract(withBundleAnalyzer(withNextIntl(nextConfig)))
