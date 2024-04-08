import { style } from '@vanilla-extract/css'

import { tokens } from '@/style/theme.css'

export const contentLeftContiner = style({
	display: 'flex',
	flexDirection: 'column',
	position: 'relative',
	gap: tokens.spacing[10],
	color: tokens.colors['neutral.900'],
	height: 'calc(78vh - 160px)',
	maxHeight: '640px',
	flex: 1,
	maxWidth: '420px'
})

export const onboardingItemsContainer = style({
	margin: '0 -4px',
	flex: '1',
	overflow: 'auto'
})

export const onboardingItem = style({
	padding: tokens.spacing[4],
	backgroundColor: tokens.colors['primary.50'],
	borderRadius: tokens.borders.radius.small,
	fontWeight: tokens.typography.weight.bold,
	boxShadow: tokens.shadows.medium,
	margin: `0 ${tokens.spacing[1]}`
})

export const onboardingItemNumber = style({
	height: '40px',
	width: '40px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: tokens.borders.radius.small,
	backgroundColor: tokens.colors['primary.100']
})

export const contentRightContiner = style({
	display: 'flex',
	flexDirection: 'column',
	position: 'relative',
	height: 'calc(78vh - 160px)',
	maxHeight: '640px',
	flex: 1,
	maxWidth: '568px',
	color: tokens.colors['neutral.900'],
	backgroundColor: tokens.colors['neutral.100'],
	borderRadius: tokens.borders.radius.medium,
	padding: `${tokens.spacing[8]} ${tokens.spacing[13]}`
})

export const onboardingImageContainer = style({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-end',
	position: 'relative',
	overflow: 'hidden',
	height: '100%',
	width: 'auto',
	padding: tokens.spacing[5]
})

export const onboardingImage = style({
	display: 'block',
	objectFit: 'contain',
	borderRadius: tokens.borders.radius.small,
	border: tokens.borders.border.thin,
	borderColor: tokens.borders.color['neutral.300'],
	boxShadow: tokens.shadows.small,
	maxHeight: '100%',
	maxWidth: '100%',
	width: 'auto',
	height: 'auto',
	margin: 'auto'
})
