import { tokens } from '@/style/theme.css'
import { recipe } from '@vanilla-extract/recipes'

export const iconContainer = recipe({
	base: {
		height: '36px',
		width: '36px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: tokens.borders.radius.xsmall
	},
	variants: {
		variant: {
			audio: {
				backgroundColor: tokens.colors['neutral.150']
			},
			trash: {
				backgroundColor: tokens.colors['destructive.50']
			}
		}
	}
})
