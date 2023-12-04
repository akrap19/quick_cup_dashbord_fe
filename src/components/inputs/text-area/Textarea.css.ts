/* eslint-disable sonarjs/no-duplicate-string */
import { style } from '@vanilla-extract/css'

import { tokens } from 'style/theme.css'

const activeBorder = { borderColor: tokens.colors['primary.300'], boxShadow: tokens.shadows.xlarge }
const placeholder = { color: tokens.colors['neutral.300'] }
const disabled = { borderColor: tokens.colors['neutral.300'], color: tokens.colors['neutral.500'], opacity: '0.75' }
const hasError = { color: tokens.colors['destructive.500'] }

export const textareaWrapper = style({
	position: 'relative',
	color: tokens.colors['neutral.800']
})

export const textarea = style({
	height: '8rem',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	outline: 'none',
	border: `1px solid ${tokens.colors['neutral.300']}`,
	fontSize: tokens.typography.size.small,
	lineHeight: tokens.typography.lineHeight.medium,
	borderRadius: tokens.borders.radius.small,
	padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
	backgroundColor: tokens.colors['shades.00'],
	color: 'inherit',
	fontFamily: 'unset',
	resize: 'none',

	':focus': activeBorder,
	':hover': activeBorder,
	':active': activeBorder,
	'::placeholder': placeholder,
	':disabled': disabled
})

export const textareaHasError = style({
	...hasError,
	':hover': hasError,
	':focus': hasError,
	':active': hasError
})
