import { tokens } from '@/style/theme.css'
import { style } from '@vanilla-extract/css'

export const Drawer = style({
	paddingTop: tokens.spacing[12],
	paddingRight: tokens.spacing[3],
	paddingLeft: tokens.spacing[3],
	paddingBottom: tokens.spacing[8],
	backgroundColor: tokens.colors['neutral.50'],
	borderRight: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300']
})

export const DrawerItem = style({
	color: tokens.colors['neutral.800']
})
