import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
	boxSizing: 'border-box',
	margin: 0
})

globalStyle('h1, h2, h3, h4, h5, h6, p, span, strong', {
	color: 'inherit'
})
