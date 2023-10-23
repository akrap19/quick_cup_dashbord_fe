import { style } from '@vanilla-extract/css'

import { tokens } from '../../../style/theme.css'

export const tabsWrapper = style({
	width: '100%',
	borderBottom: `1px solid ${tokens.borders.color['neutral.200']}`
})

export const tab = style({
	paddingLeft: tokens.spacing[4],
	paddingRight: tokens.spacing[4],
	paddingTop: tokens.spacing[2],
	paddingBottom: tokens.spacing[2],
	fontWeight: tokens.typography.weight.regular,
	fontSize: tokens.typography.size.medium,
	lineHeight: tokens.typography.lineHeight.large,
	color: tokens.colors['neutral.400'],
	border: 'none',
	background: 'transparent',
	cursor: 'pointer',
	position: 'relative'
})

export const activeTab = style({
	color: tokens.colors['shades.100'],

	'::after': {
		content: ' ',
		display: 'block',
		width: '100%',
		height: '1px',
		background: tokens.colors['primary.500'],
		position: 'absolute',
		left: 0,
		bottom: '-1px'
	}
})
