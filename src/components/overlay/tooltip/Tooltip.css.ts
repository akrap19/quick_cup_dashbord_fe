import { globalStyle, style } from '@vanilla-extract/css'

import { tokens } from '../../../style/theme.css'

export const tooltipWrapper = style({
	position: 'relative',
	display: 'inline-block'
})

globalStyle(`${tooltipWrapper}:hover > div:last-child`, {
	opacity: 1,
	visibility: 'visible'
})

export const tooltipContent = style({
	position: 'absolute',
	bottom: '100%',
	left: '50%',
	transform: 'translateX(-50%)',
	marginBottom: tokens.spacing[1],
	padding: `${tokens.spacing[1]} ${tokens.spacing[2]}`,
	backgroundColor: tokens.colors['shades.00'],
	color: tokens.colors['neutral.800'],
	borderRadius: tokens.borders.radius.small,
	border: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	fontSize: tokens.typography.size.xsmall,
	whiteSpace: 'nowrap',
	opacity: 0,
	visibility: 'hidden',
	pointerEvents: 'none',
	transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
	zIndex: tokens.indices.over2,
	boxShadow: tokens.shadows.medium,
	':after': {
		content: '""',
		position: 'absolute',
		top: '100%',
		left: '50%',
		transform: 'translateX(-50%)',
		borderWidth: '4px',
		borderStyle: 'solid',
		borderColor: `${tokens.colors['shades.00']} transparent transparent transparent`
	},
	':before': {
		content: '""',
		position: 'absolute',
		top: '100%',
		left: '50%',
		transform: 'translateX(-50%)',
		borderWidth: '5px',
		borderStyle: 'solid',
		borderColor: `${tokens.colors['shades.00']} transparent transparent transparent`,
		marginTop: '-1px'
	}
})

export const tooltipBottom = style({
	bottom: 'auto',
	top: '100%',
	marginTop: tokens.spacing[1],
	marginBottom: 0,
	':after': {
		top: 'auto',
		bottom: '100%',
		borderColor: `transparent transparent ${tokens.colors['neutral.500']} transparent`
	}
})

export const tooltipLeft = style({
	right: '100%',
	left: 'auto',
	top: '50%',
	bottom: 'auto',
	transform: 'translateY(-50%)',
	marginRight: tokens.spacing[2],
	marginLeft: 0,
	marginTop: 0,
	marginBottom: 0,
	':after': {
		left: '100%',
		right: 'auto',
		top: '50%',
		bottom: 'auto',
		transform: 'translateY(-50%)',
		borderColor: `transparent transparent transparent ${tokens.colors['neutral.500']}`
	}
})

export const tooltipRight = style({
	left: '100%',
	right: 'auto',
	top: '50%',
	bottom: 'auto',
	transform: 'translateY(-50%)',
	marginLeft: tokens.spacing[2],
	marginRight: 0,
	marginTop: 0,
	marginBottom: 0,
	':after': {
		right: '100%',
		left: 'auto',
		top: '50%',
		bottom: 'auto',
		transform: 'translateY(-50%)',
		borderColor: `transparent ${tokens.colors['neutral.500']} transparent transparent`
	}
})
