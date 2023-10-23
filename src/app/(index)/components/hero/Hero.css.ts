import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const heroHeading = style({
	color: tokens.colors['shades.00'],
	fontWeight: tokens.typography.weight.bold,
	fontSize: '5rem'
})
