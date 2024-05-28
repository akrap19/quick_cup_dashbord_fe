import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const card = style({
	display: 'flex',
	justifyContent: 'space-between',
	padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
	borderRadius: tokens.borders.radius.small,
	border: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	backgroundColor: tokens.colors['neutral.50'],
	minWidth: '26rem',
	boxShadow: tokens.shadows.xsmall
})
