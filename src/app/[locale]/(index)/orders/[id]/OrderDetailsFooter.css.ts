import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const footer = style({
	position: 'absolute',
	height: '81px',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: 'calc(100% - 245px)',
	flex: 1,
	backgroundColor: tokens.colors['shades.00'],
	borderTop: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	bottom: '0',
	right: '0',
	padding: `${tokens.spacing[4]} ${tokens.spacing[16]} ${tokens.spacing[4]} ${tokens.spacing[10]}`,
	zIndex: 1000
})
