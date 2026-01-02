/* eslint-disable sonarjs/no-duplicate-string */
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { style } from '@vanilla-extract/css'

import { tokens } from 'style/theme.css'

const activeBorder = { borderColor: tokens.colors['primary.300'], boxShadow: tokens.shadows.xlarge }
const placeholder = { color: tokens.colors['neutral.300'] }
const disabled = {
	borderColor: tokens.colors['neutral.300'],
	boxShadow: 'unset'
}
const hasError = { borderColor: tokens.colors['destructive.500'] }
const hasSuccess = { borderColor: tokens.colors['success.500'] }

export const inputWrapper = style({
	position: 'relative',
	color: tokens.colors['neutral.800']
})

export const input = recipe({
	base: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		outline: 'none',
		border: `1px solid ${tokens.colors['neutral.300']}`,
		lineHeight: tokens.typography.lineHeight.medium,
		borderRadius: tokens.borders.radius.small,
		backgroundColor: tokens.colors['neutral.50'],
		color: 'inherit',
		fontFamily: 'var(--inter-font)',

		':focus': activeBorder,
		':hover': activeBorder,
		':active': activeBorder,
		'::placeholder': placeholder,
		':-ms-input-placeholder': placeholder,
		'::-webkit-input-placeholder': placeholder,
		':disabled': disabled
	},
	variants: {
		size: {
			small: {
				height: '2.125rem',
				fontSize: tokens.typography.size.small,
				paddingLeft: tokens.spacing[3],
				paddingRight: tokens.spacing[3]
			},
			medium: {
				height: '2.5rem',
				fontSize: tokens.typography.size.small,
				paddingLeft: tokens.spacing[3],
				paddingRight: tokens.spacing[3]
			},
			large: {
				height: '3rem',
				fontSize: tokens.typography.size.medium,
				paddingLeft: tokens.spacing[4],
				paddingRight: tokens.spacing[4]
			}
		},
		disabled: {
			true: {
				':focus': disabled,
				':hover': disabled,
				':active': disabled
			}
		}
	},
	defaultVariants: {
		size: 'medium',
		disabled: false
	}
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

export type InputVariants = RecipeVariants<typeof input>

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
