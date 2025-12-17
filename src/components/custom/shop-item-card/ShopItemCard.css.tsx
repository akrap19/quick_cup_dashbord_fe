import { tokens } from '@/style/theme.css'
import { breakpoints } from '@/style/tokens/breakpoints'
import { style, keyframes } from '@vanilla-extract/css'

const rainbowAnimation = keyframes({
	'0%': { backgroundPosition: '0% 50%' },
	'50%': { backgroundPosition: '100% 50%' },
	'100%': { backgroundPosition: '0% 50%' }
})

export const rainbowText = style({
	background:
		'linear-gradient(to right, #ef5350, #f48fb1, #7e57c2, #2196f3, #26c6da, #43a047, #eeff41, #f9a825, #ff5722)',
	backgroundSize: '200% 100%',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
	backgroundClip: 'text',
	animation: `${rainbowAnimation} 3s ease-in-out infinite`,
	color: 'transparent !important'
})

export const shopItemCardContainer = style({
	width: '100%',
	maxWidth: '300px',
	minWidth: '274px',
	backgroundColor: tokens.colors['shades.00'],
	boxShadow: tokens.shadows.mediumSmall,
	borderRadius: tokens.borders.radius.small,
	padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
	overflow: 'hidden',
	transition: 'all 0.3s ease',

	'@media': {
		[`screen and (min-width: ${breakpoints.wideMobile}px)`]: { width: 'calc(50% - 3rem)', minWidth: 'none' },
		[`screen and (min-width: ${breakpoints.tablet}px)`]: {
			width: 'auto',
			minWidth: '274px',
			':hover': {
				scale: '1.03'
			}
		}
	}
})

export const shopItemCardImageContainer = style({
	position: 'relative',
	height: '300px',
	transition: 'all 0.6s ease'
})
