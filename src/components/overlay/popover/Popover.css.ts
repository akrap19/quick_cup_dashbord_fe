import { style } from '@vanilla-extract/css'

import { tokens } from '../../../style/theme.css'

export const content = style({
	borderRadius: tokens.borders.radius.small,
	padding: tokens.spacing[2],
	backgroundColor: tokens.colors['neutral.500'],
	boxShadow: tokens.shadows.medium,
	width: '16rem',
	color: tokens.colors['shades.00'],
	fontSize: 'small'
})

export const trigger = style({
	backgroundColor: 'unset',
	border: 'unset',
	padding: 'unset',
	height: '1.5rem',
	paddingBlock: 'unset',
	paddingInline: 'unset'
})
