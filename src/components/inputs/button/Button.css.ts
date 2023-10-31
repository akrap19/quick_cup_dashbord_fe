import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { tokens } from 'style/theme.css'

export const button = recipe({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		border: 'none',
		borderRadius: tokens.borders.radius.small,
		gap: tokens.spacing[1],

		':disabled': {
			cursor: 'default',
			opacity: '0.3'
		}
	},
	variants: {
		size: {
			small: {
				height: '2.125rem',
				paddingLeft: tokens.spacing[6],
				paddingRight: tokens.spacing[6],
				fontSize: tokens.typography.size.small
			},
			large: {
				height: '3rem',
				paddingLeft: tokens.spacing[8],
				paddingRight: tokens.spacing[8],
				fontSize: tokens.typography.size.medium,
				fontWeight: tokens.typography.weight.semibold
			}
		},
		variant: {
			primary: {
				backgroundColor: '#6A35FF',
				color: '#FFFFFF',
				':hover': { backgroundColor: '#725CFF' }
			},
			secondary: {
				backgroundColor: '#FFFFFF',
				color: '#454545',
				border: '1px solid #ADADAD',
				':hover': { backgroundColor: '#F6F6F6' }
			},
			ghost: {
				backgroundColor: '#FFFFFF',
				color: '#6A35FF',
				padding: 'unset',
				fontWeight: tokens.typography.weight.semibold
			},
			destructive: {
				backgroundColor: '#FE5F55',
				color: '#FCFCFC',
				':hover': { backgroundColor: '#FF8B84' }
			},
			success: {
				backgroundColor: '#198754',
				color: '#FCFCFC',
				':hover': { backgroundColor: '#20AC6B' }
			}
		}
	},
	defaultVariants: {
		variant: 'primary',
		size: 'large'
	}
})

export type ButtonVariants = RecipeVariants<typeof button>
