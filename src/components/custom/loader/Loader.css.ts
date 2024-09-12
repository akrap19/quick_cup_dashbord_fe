// loader.css.ts
import { keyframes, style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

const s = '30px'
const d = `calc(0.353 * ${s})`

const l6 = keyframes({
	'0%': { transform: 'translate(0, 0)' },
	'25%': { transform: 'translate(45px, 0)' },
	'50%': { transform: 'translate(45px, 45px)' },
	'75%': { transform: 'translate(0, 45px)' },
	'100%': { transform: 'translate(0, 0)' }
})

export const loader = style({
	vars: {
		'--s': s,
		'--_d': d
	},
	width: `calc(var(--s) + var(--_d))`,
	aspectRatio: '1',
	display: 'grid'
})

export const loaderBefore = style({
	vars: {
		'--_d': d
	},
	content: '""',
	gridArea: '1/1',
	clipPath: `polygon(var(--_d) 0, 100% 0, 100% calc(100% - var(--_d)), calc(100% - var(--_d)) 100%, 0 100%, 0 var(--_d))`,
	background: `conic-gradient(from -90deg at calc(100% - var(--_d)) var(--_d), ${tokens.colors['primary.400']} 135deg, ${tokens.colors['primary.600']} 0 270deg, ${tokens.colors['primary.200']} 0)`,
	animation: `${l6} 2s infinite`
})

export const loaderAfter = style({
	vars: {
		'--_d': d
	},
	content: '""',
	gridArea: '1/1',
	clipPath: `polygon(var(--_d) 0, 100% 0, 100% calc(100% - var(--_d)), calc(100% - var(--_d)) 100%, 0 100%, 0 var(--_d))`,
	background: `conic-gradient(from -90deg at calc(100% - var(--_d)) var(--_d), ${tokens.colors['primary.400']} 135deg, ${tokens.colors['primary.600']} 0 270deg, ${tokens.colors['primary.200']} 0)`,
	animation: `${l6} 2s infinite -1s`
})
