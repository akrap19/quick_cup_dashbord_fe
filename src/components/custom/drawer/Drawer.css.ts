import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

const selected = { backgroundColor: tokens.colors['primary.75'] }

export const drawer = style({
	padding: `${tokens.spacing[12]} ${tokens.spacing[3]} ${tokens.spacing[8]}`,
	backgroundColor: tokens.colors['neutral.50'],
	borderRight: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	zIndex: tokens.indices.over
})

export const drawerItem = style({
	cursor: 'pointer',
	color: tokens.colors['neutral.800'],
	borderRadius: tokens.borders.radius.small,
	padding: `${tokens.spacing[3]} ${tokens.spacing[6]}`,
	width: '264px',
	':hover': { backgroundColor: tokens.colors['neutral.100'] }
})

export const drawerItemSelected = style({
	cursor: 'default',
	color: tokens.colors['primary.500'],
	...selected,
	':hover': selected
})
