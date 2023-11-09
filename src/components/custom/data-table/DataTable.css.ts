import { tokens } from '@/style/theme.css'
import { style } from '@vanilla-extract/css'

export const dataTableContainer = style({
	width: '100%',
	padding: `${tokens.spacing[8]} ${tokens.spacing[20]} ${tokens.spacing[8]} ${tokens.spacing[10]}`
})

export const dataTablePaginationContainer = style({
	position: 'absolute',
	right: tokens.spacing[20],
	bottom: tokens.spacing[14],
	display: 'flex',
	color: tokens.colors['neutral.400']
})
