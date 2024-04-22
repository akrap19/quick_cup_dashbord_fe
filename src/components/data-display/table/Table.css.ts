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
	border: border.border,
	borderColor: border.borderColor,
	width: '100%',
	overflow: 'auto',
	maxHeight: 'calc(100vh - 348px)'
})

export const table = style({
	width: '100%',
	borderSpacing: 0,
	borderCollapse: 'collapse'
})

export const tableHeader = style({
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
	':hover': { background: tokens.colors['neutral.100'] },
	':last-child': {
		borderBottom: 'unset'
	}
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
		width: '72px',
		borderLeft: 'unset'
	}
})

const tableCellStyle = {
	borderLeft: border.border,
	borderColor: border.borderColor,
	fontWeight: tokens.typography.weight.regular,
	':first-child': {
		borderLeft: 'unset'
	}
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
