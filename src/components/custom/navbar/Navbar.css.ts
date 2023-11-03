import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const navbar = style({
	display: 'flex',
	justifyContent: 'space-between',
	paddingTop: tokens.spacing[13],
	paddingRight: tokens.spacing[16],
	paddingBottom: tokens.spacing[8],
	paddingLeft: tokens.spacing[10],
	backgroundColor: tokens.colors['neutral.50'],
	borderBottom: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300']
})
