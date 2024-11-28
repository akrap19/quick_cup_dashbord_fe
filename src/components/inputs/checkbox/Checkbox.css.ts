import { style } from '@vanilla-extract/css'

import { tokens } from 'style/theme.css'

export const checkboxWrapper = style({
	display: 'inline-flex',
	alignItems: 'center',
	cursor: 'pointer',
	gap: tokens.spacing[2]
})

export const hiddenCheckbox = style({
	border: 0,
	height: '1px',
	left: 0,
	opacity: 0,
	position: 'absolute',
	top: 0,
	width: '1px'
})

export const checkboxField = style({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
})

export const checkboxDecorator = style({
	border: tokens.borders.border.thin,
	borderColor: tokens.colors['neutral.300'],
	borderRadius: tokens.borders.radius.xsmall,
	width: '1.5rem',
	height: '1.5rem',
	backgroundColor: 'currentcolor',

	// When Radio selected by "Tab" key
	selectors: {
		[`${hiddenCheckbox}:focus-visible + &`]: {
			borderColor: tokens.colors['primary.500']
		}
	}
})

export const checked = style({
	position: 'absolute',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)'
})
