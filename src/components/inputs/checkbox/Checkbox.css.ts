import { style } from '@vanilla-extract/css'

import { tokens } from 'style/theme.css'

export const checkboxWrapper = style({
	display: 'inline-flex',
	alignItems: 'center',
	cursor: 'pointer',
	gap: tokens.spacing[3]
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
	position: 'relative'
})

export const checkboxDecorator = style({
	borderColor: tokens.colors['primary.500'],
	borderWidth: '2px',
	borderRadius: tokens.borders.radius.small,
	borderStyle: 'solid',
	width: '1.5rem',
	height: '1.5rem',
	backgroundColor: 'currentcolor',

	// When Radio selected by "Tab" key
	selectors: {
		[`${hiddenCheckbox}:focus-visible + &`]: {
			outline: `2px solid ${tokens.colors['primary.300']}`
		}
	}
})

export const checked = style({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)'
})
