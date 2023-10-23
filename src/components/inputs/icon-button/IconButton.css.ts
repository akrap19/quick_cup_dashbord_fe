import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { tokens } from 'style/theme.css'

export const iconButton = recipe({
	base: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		border: 'none',
		borderRadius: tokens.borders.radius.small,

		':disabled': {
			cursor: 'default',
			opacity: '0.3'
		}
	},
	variants: {
		variant: {
			primary: {
				backgroundColor: '#5135FF',
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
				color: '#5135FF',
				':hover': { backgroundColor: '#F2F0FF' }
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
		},
		size: {
			small: {
				height: '2.125rem',
				width: '2.125rem'
			},
			large: {
				height: '3rem',
				width: '3rem'
			}
		}
	},
	defaultVariants: {
		variant: 'primary',
		size: 'large'
	}
})

export type IconButtonVariants = RecipeVariants<typeof iconButton>
