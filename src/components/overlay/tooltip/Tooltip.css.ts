import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const trigger = style({
	border: 'none',
	padding: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	background: 'transparent'
})

export const content = style({
	borderRadius: tokens.borders.radius.small,
	color: tokens.colors['shades.00'],
	fontSize: tokens.typography.size.xsmall,
	backgroundColor: tokens.colors['neutral.400'],
	padding: tokens.spacing['2'],
	maxWidth: '14rem',
	width: '100%'
})
