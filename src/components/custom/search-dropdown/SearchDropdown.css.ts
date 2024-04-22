import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const dropdownListContainer = style({
	width: '100%',
	position: 'absolute',
	zIndex: tokens.indices.over,
	backgroundColor: tokens.colors['neutral.50'],
	padding: tokens.spacing[2],
	borderRadius: tokens.borders.radius.small,
	border: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	marginTop: tokens.spacing[1]
})

export const dropdownListItemsContainer = style({
	overflow: 'auto',
	maxHeight: '154px'
})

export const dropdownListItem = style({
	color: tokens.colors['neutral.500'],
	padding: tokens.spacing[1],
	borderRadius: tokens.borders.radius.small,
	width: '100%',
	textAlign: 'left',

	':hover': { backgroundColor: tokens.colors['neutral.100'] }
})
