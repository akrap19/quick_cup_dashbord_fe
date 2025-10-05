import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

const selected = { backgroundColor: tokens.colors['primary.50'] }

const drawerItemTemp = {
	flex: '1',
	color: tokens.colors['neutral.800'],
	borderRadius: tokens.borders.radius.small,
	':hover': { backgroundColor: tokens.colors['neutral.100'] }
}

export const drawer = style({
	padding: `${tokens.spacing[8]} ${tokens.spacing[3]} ${tokens.spacing[8]}`,
	backgroundColor: tokens.colors['neutral.50'],
	minWidth: '200px',
	borderRight: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	zIndex: tokens.indices.over
})

export const drawerItem = style({
	...drawerItemTemp,
	flex: '1',
	padding: `${tokens.spacing[3]} ${tokens.spacing[4]} ${tokens.spacing[3]} ${tokens.spacing[4]}`
})

export const drawerSubItem = style({
	...drawerItemTemp,
	padding: `${tokens.spacing[3]} ${tokens.spacing[10]}`
})

export const drawerItemSelected = style({
	color: tokens.colors['primary.500'],
	...selected,
	':hover': selected
})
