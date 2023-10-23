import { style } from '@vanilla-extract/css'

import { tokens } from 'style/theme.css'

export const divider = style({
	width: '100%',
	height: '1px',
	background: tokens.colors['neutral.200']
})
