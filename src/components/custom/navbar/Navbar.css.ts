import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const navbar = style({
	display: 'flex',
	justifyContent: 'space-between',
	height: '7.5rem',
	padding: `${tokens.spacing[13]} ${tokens.spacing[16]} ${tokens.spacing[8]} ${tokens.spacing[10]}`,
	backgroundColor: tokens.colors['neutral.50'],
	borderBottom: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300']
})
