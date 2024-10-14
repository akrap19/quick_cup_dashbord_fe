import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const fileInput = style({
	display: 'none'
})

export const fileContainer = style({
	width: '480px',
	borderRadius: tokens.borders.radius.small,
	padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
	border: tokens.borders.border.thin,
	backgroundColor: tokens.colors['shades.00'],
	borderColor: tokens.borders.color['neutral.300']
})

export const fileLabelConteiner = style({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	width: '350px',
	height: '30px',
	overflow: 'auto'
})

export const fileLabel = style({
	color: tokens.colors['neutral.800'],
	fontSize: tokens.typography.size.small,
	fontWeight: tokens.typography.weight.regular,
	lineHeight: tokens.typography.lineHeight.xlarge
})

export const audioUploadLabel = style({
	cursor: 'pointer',
	display: 'inline-block',
	borderRadius: tokens.borders.radius.small,
	backgroundColor: tokens.colors['shades.00'],
	padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
	fontSize: tokens.typography.size.small,
	fontWeight: tokens.typography.weight.semibold,
	color: tokens.colors['neutral.700'],
	border: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	userSelect: 'none',

	':hover': {
		backgroundColor: tokens.colors['neutral.100']
	}
})
