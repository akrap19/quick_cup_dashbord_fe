import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const fileInput = style({
	display: 'none'
})

export const photoUploadLabel = style({
	height: '300px',
	width: '242px',
	borderRadius: tokens.borders.radius.small,
	cursor: 'pointer',
	display: 'inline-block',
	backgroundColor: tokens.colors['neutral.150'],
	padding: `${tokens.spacing[15]} ${tokens.spacing[4]}`,
	fontSize: tokens.typography.size.xsmall,
	fontWeight: tokens.typography.weight.regular,
	lineHeight: tokens.typography.lineHeight.xxlarge,
	color: tokens.colors['neutral.800'],
	textAlign: 'center',
	userSelect: 'none'
})

export const imageDeleteIconContainer = style({
	position: 'absolute',
	top: tokens.spacing[2],
	left: tokens.spacing[2]
})
