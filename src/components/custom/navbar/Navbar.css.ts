import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const navbar = style({
	paddingTop: tokens.spacing[4],
	paddingBottom: tokens.spacing[4],
	color: tokens.colors['primary.500'],
	fontWeight: tokens.typography.weight.bold,
	backgroundColor: '#1C1C1C'
})

export const link = style({
	fontWeight: tokens.typography.weight.bold,
	textDecoration: 'none'
})
