import { tokens } from '@/style/theme.css'
import { keyframes, style } from '@vanilla-extract/css'

const scaleUp = keyframes({
	'0%': { transform: 'translate(-50%, -50%) scale(0)' },
	'60%': { transform: 'translate(-50%, -50%) scale(1)' },
	'100%': { transform: 'translate(-50%, -50%) scale(1)' }
})

const pulse = keyframes({
	'0%': { transform: 'scale(1)' },
	'60%': { transform: 'scale(1)' },
	'80%': { transform: 'scale(1.2)' },
	'100%': { transform: 'scale(1)' }
})

export const loader = style({
	width: '2rem',
	height: '2rem',
	border: `5px solid ${tokens.colors['neutral.500']}`,
	borderRadius: '50%',
	display: 'inline-block',
	boxSizing: 'border-box',
	position: 'relative',
	animation: `${pulse} 1s linear infinite`
})

export const loaderAfter = style({
	content: '""',
	position: 'absolute',
	width: '2rem',
	height: '2rem',
	border: `5px solid ${tokens.colors['neutral.500']}`,
	borderRadius: '50%',
	display: 'inline-block',
	boxSizing: 'border-box',
	left: '50%',
	top: '50%',
	transform: 'translate(-50%, -50%)',
	animation: `${scaleUp} 1s linear infinite`
})
