import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const dropdownListContainer = style({
	width: 'auto',
	maxHeight: '377px',
	position: 'relative',
	scrollbarWidth: 'thin',
	paddingTop: tokens.spacing[2],
	zIndex: tokens.indices.over,
	backgroundColor: tokens.colors['neutral.50'],
	borderRadius: tokens.borders.radius.small,
	border: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	overflow: 'auto',
	marginTop: '3px'
})

export const dropdownListItem = style({
	padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
	color: tokens.colors['neutral.900'],
	borderBottom: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.50'],
	width: '100%',
	textAlign: 'left',
	':hover': {
		backgroundColor: tokens.colors['neutral.100'],
		borderColor: tokens.borders.color['neutral.300']
	}
})
