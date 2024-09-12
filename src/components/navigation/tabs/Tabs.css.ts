import { style } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { tokens } from '../../../style/theme.css'

export const tabsWrapper = recipe({
	base: {
		borderBottom: `1px solid ${tokens.borders.color['neutral.300']}`
	},
	variants: {
		variant: {
			span: {
				paddingBottom: '6px'
			},
			button: {}
		},
		size: {
			small: {
				width: 'auto'
			},
			large: {
				width: '100%'
			}
		}
	}
})

export type TabsWrapperVariants = RecipeVariants<typeof tabsWrapper>

export const tab = recipe({
	base: {
		paddingLeft: tokens.spacing[3],
		paddingRight: tokens.spacing[3],
		paddingTop: tokens.spacing[2],
		paddingBottom: tokens.spacing[2],
		fontWeight: tokens.typography.weight.regular,
		fontSize: tokens.typography.size.medium,
		lineHeight: tokens.typography.lineHeight.xlarge,
		color: tokens.colors['neutral.800'],
		border: 'none',
		background: 'transparent',
		position: 'relative'
	},
	variants: {
		variant: {
			span: {
				marginBottom: '6px'
			},
			button: {
				cursor: 'pointer'
			}
		}
	}
})

export const activeTab = style({
	color: tokens.colors['shades.100'],
	fontWeight: tokens.typography.weight.semibold,

	'::after': {
		content: ' ',
		display: 'block',
		width: '100%',
		height: '2px',
		background: tokens.colors['primary.500'],
		position: 'absolute',
		left: 0,
		bottom: '-1px'
	}
})
