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
		},
		':focus-visible': {
			outline: 'unset',
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
				backgroundColor: tokens.colors['primary.500'],
				color: tokens.colors['shades.00'],
				':hover': { backgroundColor: tokens.colors['primary.400'] },
				':disabled': { backgroundColor: tokens.colors['primary.200'] }
			},
			secondary: {
				backgroundColor: tokens.colors['shades.00'],
				color: tokens.colors['neutral.700'],
				border: `1px solid ${tokens.colors['neutral.300']}`,
				':hover': { backgroundColor: tokens.colors['neutral.100'] },
				':disabled': { backgroundColor: tokens.colors['shades.00'] }
			},
			ghost: {
				backgroundColor: tokens.colors['shades.00'],
				color: tokens.colors['primary.500'],
				':hover': { backgroundColor: tokens.colors['primary.75'] },
				':disabled': { backgroundColor: tokens.colors['shades.00'] }
			},
			adaptive: {
				backgroundColor: 'transparent',
				color: tokens.colors['primary.500'],
				padding: 'unset'
			},
			destructive: {
				backgroundColor: tokens.colors['destructive.500'],
				color: tokens.colors['neutral.50'],
				':hover': { backgroundColor: tokens.colors['destructive.400'] },
				':disabled': { backgroundColor: tokens.colors['destructive.200'] }
			},
			success: {
				backgroundColor: tokens.colors['success.500'],
				color: tokens.colors['neutral.50'],
				':hover': { backgroundColor: tokens.colors['success.400'] },
				':disabled': { backgroundColor: tokens.colors['success.200'] }
			}
		}
	},
	defaultVariants: {
		variant: 'primary',
		size: 'large'
	}
})

export type ButtonVariants = RecipeVariants<typeof button>
