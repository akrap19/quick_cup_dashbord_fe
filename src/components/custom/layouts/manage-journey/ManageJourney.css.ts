import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const actions = style({
	position: 'fixed',
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	backgroundColor: tokens.colors['neutral.50'],
	borderTop: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	bottom: '0',
	left: tokens.spacing[72],
	padding: `${tokens.spacing[4]} ${tokens.spacing[82]} ${tokens.spacing[4]} ${tokens.spacing[10]}`
})

export const manageJourneyWrapper = style({
	position: 'relative',
	maxWidth: '60rem',
	paddingTop: tokens.spacing[6],
	paddingBottom: tokens.spacing[6],
	backgroundColor: tokens.colors['neutral.50'],
	border: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300']
})

export const stepIndicatior = style({
	height: '8px',
	width: '100%',
	borderRadius: tokens.borders.radius.large
})
