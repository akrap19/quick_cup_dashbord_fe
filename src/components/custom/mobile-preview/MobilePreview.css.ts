import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'
import { borders } from '@/style/tokens/borders'

export const mobilePreviewContainer = style({
	position: 'absolute',
	display: 'flex',
	alignItems: 'center',
	overflow: 'hidden',
	borderRadius: tokens.borders.radius.medium,
	marginTop: tokens.spacing[9],
	height: '460px',
	width: '225px'
})

export const mobilePreviewContentContainer = style({
	position: 'absolute',
	scale: '0.6',
	padding: `${tokens.spacing[3]} ${tokens.spacing[5]}`,
	height: '760px',
	width: '374px',
	marginLeft: '-74px'
})

export const mobilePreviewBackButtonContainer = style({
	width: '56px',
	height: '56px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: tokens.colors['neutral.50'],
	borderRadius: borders.radius.medium
})
