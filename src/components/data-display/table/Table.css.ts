import { style } from '@vanilla-extract/css'

import { tokens } from '../../../style/theme.css'

const border = {
	border: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300']
}

const font = {
	fontSize: tokens.typography.size.medium,
	lineHeight: tokens.typography.lineHeight.xlarge,
	color: tokens.colors['neutral.900']
}

export const tableWrapper = style({
	width: '100%',
	overflow: 'auto'
})

export const table = style({
	width: '100%',
	borderSpacing: 0,
	borderCollapse: 'collapse',
	borderRight: border.border,
	borderLeft: border.border,
	borderColor: border.borderColor
})

export const tableHeader = style({
	borderTop: border.border,
	borderColor: border.borderColor,
	backgroundColor: tokens.colors['neutral.100']
})

export const tableBody = style({
	backgroundColor: tokens.colors['neutral.50']
})

export const tableFooter = style({
	backgroundColor: tokens.colors['primary.100'],
	fontSize: tokens.typography.size.medium
})

export const tableRow = style({
	borderBottom: border.border,
	borderColor: border.borderColor,
	':hover': { background: tokens.colors['neutral.100'] }
})

export const tableHead = style({
	padding: `${tokens.spacing[4]} ${tokens.spacing[6]}`,
	fontWeight: tokens.typography.weight.semibold,
	textAlign: 'left',
	borderBottom: border.border,
	borderLeft: border.border,
	borderColor: border.borderColor,
	...font,
	':first-child': {
		width: '72px'
	}
})

const tableCellStyle = {
	borderLeft: border.border,
	borderColor: border.borderColor,
	fontWeight: tokens.typography.weight.regular
}

export const tableCell = style({
	padding: `${tokens.spacing[4]} ${tokens.spacing[6]}`,
	...tableCellStyle,
	...font
})

export const tableCellWithLink = style({
	...tableCellStyle,
	...font
})

export const tableCaption = style({
	marginTop: tokens.spacing[4],
	fontSize: tokens.typography.size.small
})
