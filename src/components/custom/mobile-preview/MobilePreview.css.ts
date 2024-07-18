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
	height: '552px',
	overflow: 'auto',
	fontFamily: `'Helvetica', 'Arial', sans-serif`,
	backgroundColor: '#DAF3F8',
	boxShadow: '0px 0px 20px 0px #A4D7E1',
	borderRadius: tokens.borders.radius.medium,
	padding: tokens.spacing[4],
	scrollbarWidth: 'none'
})

export const mobilePreviewButton = recipe({
	base: {
		fontFamily: `'Helvetica', 'Arial', sans-serif`,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		flex: '1',
		padding: `${tokens.spacing[5]} ${tokens.spacing[2]}`,
		fontSize: tokens.typography.size.big,
		fontWeight: tokens.typography.weight.bold,
		lineHeight: tokens.typography.lineHeight.medium,
		textTransform: 'uppercase',
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
				color: tokens.colors['shades.00']
			},
			secondary: {
				backgroundColor: tokens.colors['shades.transperent'],
				color: tokens.colors['primary.500'],
				border: `1px solid ${tokens.colors['primary.500']}`
			}
		}
	},
	defaultVariants: {
		variant: 'primary'
	}
})

export type MobilePreviewButtonVariants = RecipeVariants<typeof mobilePreviewButton>

export const mobilePreviewDropdownInput = style({
	height: '3.5rem',
	width: '191px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	backgroundColor: tokens.colors['neutral.50'],
	borderRadius: tokens.borders.radius.medium,
	padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`
})

export const MobilePreviewDropdownLabel = recipe({
	base: {
		fontFamily: `'Helvetica', 'Arial', sans-serif`,
		appearance: 'none',
		color: tokens.colors['neutral.900']
	},
	variants: {
		variant: {
			selectedLabel: {
				fontSize: tokens.typography.size.medium,
				fontWeight: tokens.typography.weight.bold,
				lineHeight: tokens.typography.lineHeight.xxlarge
			},
			dropDownItemLabel: {
				fontSize: tokens.typography.size.medium,
				fontWeight: tokens.typography.weight.regular,
				lineHeight: tokens.typography.lineHeight.xlarge
			}
		}
	}
})

export type MobilePreviewDropdownLabelVariants = RecipeVariants<typeof MobilePreviewDropdownLabel>

export const mobilePreviewDropdownListContainer = style({
	width: '100%',
	position: 'absolute',
	zIndex: tokens.indices.over,
	backgroundColor: tokens.colors['neutral.50'],
	padding: tokens.spacing[4],
	borderRadius: tokens.borders.radius.medium,
	marginTop: tokens.spacing[4]
})
