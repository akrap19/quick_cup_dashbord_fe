import { style } from '@vanilla-extract/css'
import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { tokens } from '@/style/theme.css'

export const DropdownPresentationlabel = recipe({
	base: {
		appearance: 'none'
	},
	variants: {
		variant: {
			placeholder: {
				fontSize: tokens.typography.size.small,
				lineHeight: tokens.typography.lineHeight.medium,
				color: tokens.colors['neutral.300']
			},
			formLabel: {
				fontSize: tokens.typography.size.small,
				lineHeight: tokens.typography.lineHeight.medium,
				color: tokens.colors['neutral.800']
			},
			filterLabel: {
				fontSize: tokens.typography.size.medium,
				lineHeight: tokens.typography.lineHeight.xlarge,
				fontWeight: tokens.typography.weight.semibold,
				color: tokens.colors['neutral.500']
			}
		}
	}
})

export const dropdownListContainer = style({
	width: '100%',
	position: 'absolute',
	zIndex: tokens.indices.over,
	backgroundColor: tokens.colors['shades.00'],
	padding: tokens.spacing[2],
	borderRadius: tokens.borders.radius.small,
	border: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	marginTop: tokens.spacing[1]
})

export const dropdownListItemsContainer = style({
	overflow: 'auto',
	maxHeight: '154px'
})

export const dropdownListItem = style({
	color: tokens.colors['neutral.500'],
	padding: tokens.spacing[1],
	borderRadius: tokens.borders.radius.small,
	width: '100%',
	textAlign: 'left',

	':hover': { backgroundColor: tokens.colors['neutral.100'] }
})

export type DropdownPresentationlabelVariants = RecipeVariants<typeof DropdownPresentationlabel>
