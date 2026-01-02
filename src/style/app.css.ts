import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
	boxSizing: 'border-box',
	margin: 0
})

globalStyle('h1, h2, h3, h4, h5, h6, p, span, strong', {
	color: 'inherit'
})

globalStyle('input[type="date"]::-webkit-inner-spin-button', {
	display: 'none',
	WebkitAppearance: 'none'
})

globalStyle('input[type="date"]::-webkit-calendar-picker-indicator', {
	display: 'none',
	WebkitAppearance: 'none'
})
