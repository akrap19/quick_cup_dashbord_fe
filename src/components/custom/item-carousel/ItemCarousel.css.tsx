import { tokens } from '@/style/theme.css'
import { style } from '@vanilla-extract/css'

export const itemCarouselButton = style({
	position: 'absolute',
	width: '32px',
	height: '32px',
	top: '50%',
	transform: 'translateY(-50%)',
	zIndex: tokens.indices.over0,
	color: tokens.colors['neutral.800']
})

export const itemCarouselButtonIcon = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-start',
	borderRadius: tokens.borders.radius.full,
	backgroundColor: tokens.colors['shades.00'],
	padding: `${tokens.spacing[1]} 0`,
	opacity: 0.7
})
