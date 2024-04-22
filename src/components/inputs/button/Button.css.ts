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
		gap: tokens.spacing[2],

		':disabled': {
			cursor: 'default',
			opacity: '0.3'
		}
	},
	variants: {
		size: {
			auto: {
				height: 'auto'
			},
			small: {
				height: '2.125rem',
				paddingLeft: tokens.spacing[6],
				paddingRight: tokens.spacing[6],
				fontSize: tokens.typography.size.small
			},
			small2: {
				height: '2.25rem',
				paddingLeft: tokens.spacing[4],
				paddingRight: tokens.spacing[4],
				fontSize: tokens.typography.size.medium,
				fontWeight: tokens.typography.weight.semibold
			},
			medium: {
				height: '2.5rem',
				paddingLeft: tokens.spacing[6],
				paddingRight: tokens.spacing[6],
				fontSize: tokens.typography.size.medium,
				fontWeight: tokens.typography.weight.semibold
			},
			large: {
				height: '3rem',
				paddingLeft: tokens.spacing[6],
				paddingRight: tokens.spacing[6],
				fontSize: tokens.typography.size.big,
				fontWeight: tokens.typography.weight.semibold
			}
		},
		variant: {
			primary: {
				backgroundColor: '#6A35FF',
				color: '#FFFFFF',
				':hover': { backgroundColor: '#725CFF' },
				':disabled': { backgroundColor: '#D0C0FF' }
			},
			secondary: {
				backgroundColor: '#FFFFFF',
				color: tokens.colors['neutral.700'],
				border: `1px solid ${tokens.colors['neutral.300']}`,
				':hover': { backgroundColor: '#F6F6F6' },
				':disabled': { backgroundColor: '#FFFFFF' }
			},
			ghost: {
				backgroundColor: '#FFFFFF',
				color: '#5135FF',
				':hover': { backgroundColor: '#F2F0FF' },
				':disabled': { backgroundColor: '#FFFFFF' }
			},
			adaptive: {
				backgroundColor: 'transparent',
				color: '#6A35FF',
				padding: 'unset'
			},
			destructive: {
				backgroundColor: '#FE5F55',
				color: '#FCFCFC',
				':hover': { backgroundColor: '#FF8B84' },
				':disabled': { backgroundColor: '#EFAFAB' }
			},
			success: {
				backgroundColor: '#198754',
				color: '#FCFCFC',
				':hover': { backgroundColor: '#20AC6B' },
				':disabled': { backgroundColor: '#BBF7D0' }
			}
		}
	},
	defaultVariants: {
		variant: 'primary',
		size: 'large'
	}
})

export type ButtonVariants = RecipeVariants<typeof button>
