import { colors } from './colors'

export const borders = {
	radius: {
		none: '0',
		xsmall: '0.25rem',
		small: '0.5rem',
		medium: '1rem',
		large: '1.5rem',
		xlarge: '2rem',
		xxlarge: '2.5rem',
		full: '100%'
	},
	border: {
		thin: '1px solid currentcolor',
		medium: '1.5px solid currentcolor',
		thick: '2px solid currentcolor'
	},
	// Use only specific colors for borders so we don't include all of the available colors to the build
	color: {
		'shades.100': colors['shades.100'],
		'neutral.50': colors['neutral.50'],
		'neutral.200': colors['neutral.200'],
		'neutral.300': colors['neutral.300'],
		'neutral.400': colors['neutral.400']
	}
}
