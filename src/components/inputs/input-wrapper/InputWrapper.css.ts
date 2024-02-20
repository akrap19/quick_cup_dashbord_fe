/* eslint-disable sonarjs/no-duplicate-string */
import { style } from '@vanilla-extract/css'

import { tokens } from 'style/theme.css'

const activeBorder = { borderColor: tokens.colors['primary.300'], boxShadow: tokens.shadows.xlarge }
const placeholder = { color: tokens.colors['neutral.300'] }
const disabled = {
	borderColor: tokens.colors['neutral.300'],
	color: tokens.colors['neutral.500'],
	boxShadow: 'unset',
	opacity: '0.75'
}
const hasError = { borderColor: tokens.colors['destructive.500'] }
const hasSuccess = { borderColor: tokens.colors['success.500'] }

export const inputWrapper = style({
	position: 'relative',
	color: tokens.colors['neutral.800']
})

export const input = style({
	height: '2.5rem',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	outline: 'none',
	border: `1px solid ${tokens.colors['neutral.300']}`,
	fontSize: tokens.typography.size.small,
	lineHeight: tokens.typography.lineHeight.medium,
	borderRadius: tokens.borders.radius.small,
	paddingLeft: tokens.spacing[3],
	paddingRight: tokens.spacing[3],
	backgroundColor: tokens.colors['shades.00'],
	color: 'inherit',

	':focus': activeBorder,
	':hover': activeBorder,
	':active': activeBorder,
	'::placeholder': placeholder,
	':-ms-input-placeholder': placeholder,
	'::-webkit-input-placeholder': placeholder,
	':disabled': disabled
})

export const inputHasError = style({
	...hasError,
	':hover': hasError,
	':focus': hasError,
	':active': hasError,
	':disabled': disabled
})

export const inputHasSuccess = style({
	...hasSuccess,
	':hover': hasSuccess,
	':focus': hasSuccess,
	':active': hasSuccess,
	':disabled': disabled
})

export const iconSlot = style({
	position: 'absolute',
	top: 0,
	bottom: 0,
	margin: 'auto 0',
	display: 'flex',
	alignItems: 'center'
})

export const endIconSpacing = style({ paddingRight: tokens.spacing[12] })
export const startIconSpacing = style({ paddingLeft: tokens.spacing[12] })
