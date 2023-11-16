import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

const activeBorder = { borderColor: tokens.colors['primary.500'] }
const placeholder = { color: tokens.colors['neutral.400'] }

export const searchInputWrapper = style({
	position: 'relative',
	color: tokens.colors['neutral.800']
})

export const searchIconSlot = style({
	position: 'absolute',
	top: 0,
	bottom: 0,
	margin: 'auto 0',
	display: 'flex',
	alignItems: 'center'
})

export const searchInput = style({
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	height: '2.5rem',
	outline: 'none',
	backgroundColor: tokens.colors['neutral.100'],
	color: tokens.colors['neutral.900'],
	paddingLeft: tokens.spacing[9],
	border: 'unset',
	borderBottom: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.400'],
	fontSize: tokens.typography.size.medium,
	lineHeight: tokens.typography.lineHeight.large,

	':focus': activeBorder,
	':hover': activeBorder,
	':active': activeBorder,
	'::placeholder': placeholder,
	':-ms-input-placeholder': placeholder,
	'::-webkit-input-placeholder': placeholder
})
