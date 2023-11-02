import { tokens } from '@/style/theme.css'
import { style } from '@vanilla-extract/css'

export const Drawer = style({
	height: '100vh',
	padding: [tokens.spacing[13], tokens.spacing[16], tokens.spacing[8], tokens.spacing[10]],
	backgroundColor: tokens.colors['neutral.50'],
	borderRight: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300']
})
