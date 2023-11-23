import { tokens } from '@/style/theme.css'
import { style } from '@vanilla-extract/css'

export const fileInput = style({
	display: 'none'
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
