import { style } from '@vanilla-extract/css'

import { tokens } from '../../../style/theme.css'

export const tableWrapper = style({
	width: '100%',
	overflow: 'auto'
})

export const table = style({
	width: '100%',
	borderSpacing: 0,
	borderCollapse: 'collapse'
})

export const tableHeader = style({
	borderBottom: `1px solid ${tokens.colors['neutral.200']}`,
	backgroundColor: tokens.colors['neutral.100']
})

export const tableBody = style({})

export const tableFooter = style({
	backgroundColor: tokens.colors['primary.100'],
	fontSize: tokens.typography.size.medium
})

export const tableRow = style({
	borderBottom: `1px solid ${tokens.colors['neutral.200']}`,
	':last-child': { borderBottom: 'none' },
	':hover': { background: tokens.colors['neutral.100'] }
})

export const tableHead = style({
	padding: tokens.spacing[4],
	fontSize: tokens.typography.size.medium,
	fontWeight: tokens.typography.weight.bold,
	textAlign: 'left',
	color: tokens.colors['neutral.500']
})

export const tableCell = style({
	padding: tokens.spacing[4],
	color: tokens.colors['neutral.500']
})

export const tableCaption = style({
	marginTop: tokens.spacing[4],
	fontSize: tokens.typography.size.small
})
