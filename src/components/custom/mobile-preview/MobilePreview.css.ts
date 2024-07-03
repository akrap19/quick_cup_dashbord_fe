import { style } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { tokens } from '@/style/theme.css'
import { borders } from '@/style/tokens/borders'

export const mobilePreview = style({
	position: 'absolute',
	display: 'flex',
	alignItems: 'center',
	overflow: 'hidden',
	borderRadius: tokens.borders.radius.medium,
	marginTop: tokens.spacing[9],
	height: '460px',
	width: '225px'
})

export const mobilePreviewContainer = style({
	position: 'absolute',
	scale: '0.6',
	padding: `${tokens.spacing[3]} ${tokens.spacing[5]}`,
	height: '760px',
	width: '374px',
	marginLeft: '-74px'
})

export const mobilePreviewBackButtonWrapper = style({
	width: '56px',
	height: '56px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: tokens.colors['neutral.50'],
	borderRadius: borders.radius.medium
})

export const mobilePreviewContentContainer = style({
	width: '100%',
	height: '556px',
	backgroundColor: '#DAF3F8',
	boxShadow: '0px 0px 20px 0px #A4D7E1',
	borderRadius: tokens.borders.radius.medium,
	padding: tokens.spacing[4]
})

export const mobilePreviewButton = recipe({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		cursor: 'pointer',
		border: 'none',
		borderRadius: tokens.borders.radius.xlarge,
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
			}
		}
	},
	defaultVariants: {
		variant: 'primary'
	}
})

export type MobilePreviewButtonVariants = RecipeVariants<typeof mobilePreviewButton>
