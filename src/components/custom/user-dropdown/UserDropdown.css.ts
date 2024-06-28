import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const dropdownListContainer = style({
	width: 'auto',
	position: 'relative',
	zIndex: tokens.indices.over,
	backgroundColor: tokens.colors['neutral.50'],
	borderRadius: tokens.borders.radius.small,
	border: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	overflow: 'hidden',
	marginTop: '3px'
})

const dropdownListItemTemp = {
	color: tokens.colors['neutral.900'],
	padding: tokens.spacing[4],
	borderBottom: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.50'],
	width: '100%'
}

export const dropdownListItemWithAction = style({
	...dropdownListItemTemp,
	textAlign: 'left',
	':hover': {
		backgroundColor: tokens.colors['neutral.100'],
		borderColor: tokens.borders.color['neutral.300']
	}
})

export const dropdownListItem = style({
	...dropdownListItemTemp,
	textAlign: 'left'
})
