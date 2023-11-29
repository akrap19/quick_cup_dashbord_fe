import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const fileInput = style({
	display: 'none'
})

export const photoUploadLabel = style({
	cursor: 'pointer',
	display: 'inline-block',
	backgroundColor: tokens.colors['neutral.150'],
	padding: `${tokens.spacing[15]} ${tokens.spacing[4]}`,
	fontSize: tokens.typography.size.xsmall,
	lineHeight: tokens.typography.lineHeight.xxlarge,
	color: tokens.colors['neutral.800'],
	textAlign: 'center',
	userSelect: 'none'
})
