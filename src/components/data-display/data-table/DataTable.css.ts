import { tokens } from '@/style/theme.css'
import { style } from '@vanilla-extract/css'

export const dataTablePaginationContainer = style({
	position: 'absolute',
	right: tokens.spacing[20],
	bottom: tokens.spacing[14],
	display: 'flex',
	color: tokens.colors['neutral.400']
})

export const dataTableSelect = style({
	fontSize: tokens.typography.size.large,
	color: 'red'
})
