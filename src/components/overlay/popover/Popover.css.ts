import { style } from '@vanilla-extract/css'

import { tokens } from '../../../style/theme.css'

export const content = style({
	borderRadius: tokens.borders.radius.medium,
	padding: tokens.spacing[5],
	backgroundColor: tokens.colors['shades.00'],
	boxShadow: tokens.shadows.medium,
	width: '250px'
})
