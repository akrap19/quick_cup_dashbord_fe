import { style } from '@vanilla-extract/css'

import { tokens } from 'style/theme.css'

export const radioWrapper = style({
	display: 'inline-flex',
	alignItems: 'center',
	cursor: 'pointer',
	gap: tokens.spacing[4]
})

export const hiddenRadio = style({
	border: 0,
	height: '1px',
	left: 0,
	opacity: 0,
	position: 'absolute',
	top: 0,
	width: '1px'
})

export const radioField = style({
	position: 'relative'
})

export const radioDecorator = style({
	borderColor: 'currentcolor',
	borderWidth: '2px',
	borderRadius: tokens.borders.radius.full,
	borderStyle: 'solid',
	width: '1.5rem',
	height: '1.5rem',

	// When Radio selected by "Tab" key
	selectors: {
		[`${hiddenRadio}:focus-visible + &`]: {
			outline: `2px solid ${tokens.colors['primary.300']}`
		}
	}
})

export const checked = style({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '0.75rem',
	height: '0.75rem',
	backgroundColor: tokens.colors['primary.500'],
	borderRadius: tokens.borders.radius.full
})
