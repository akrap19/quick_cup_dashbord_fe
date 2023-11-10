import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const navButton = style({
	border: 'none',
	background: 'transparent',
	fontSize: tokens.typography.size.medium,
	cursor: 'pointer',
	fontWeight: tokens.typography.weight.semibold,
	':disabled': { color: tokens.colors['neutral.200'] }
})
