import { tokens } from '@/style/theme.css'
import { recipe, RecipeVariants } from '@vanilla-extract/recipes'

export const select = recipe({
	base: {
		appearance: 'none'
	},
	variants: {
		size: {
			large: {
				color: tokens.colors['neutral.500'],
				fontSize: tokens.typography.size.medium,
				fontWeight: tokens.typography.weight.semibold,
				lineHeight: tokens.typography.lineHeight.xlarge
			}
		}
	}
})

export type SelectVariants = RecipeVariants<typeof select>
