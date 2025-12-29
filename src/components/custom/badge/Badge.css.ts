import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

import { tokens } from 'style/theme.css'

export const badge = recipe({
	base: {
		display: 'inline-flex',
		alignItems: 'center',
		width: 'fit-content',
		whiteSpace: 'nowrap',
		gap: tokens.spacing[1],
		padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
		fontSize: tokens.typography.size.xsmall,
		fontWeight: tokens.typography.weight.bold,
		lineHeight: tokens.typography.lineHeight.small,
		borderRadius: tokens.borders.radius.large
	},
	variants: {
		variant: {
			published: {
				color: tokens.colors['success.700'],
				background: tokens.colors['success.100']
			},
			default: {
				color: tokens.colors['neutral.700'],
				background: tokens.colors['neutral.100']
			},
			draft: {
				color: tokens.colors['warning.700'],
				background: tokens.colors['warning.100']
			},
			hidden: {
				color: tokens.colors['destructive.700'],
				background: tokens.colors['destructive.100']
			},
			open: {
				color: tokens.colors['success.700'],
				background: tokens.colors['success.100']
			},
			inprogress: {
				color: tokens.colors['warning.700'],
				background: tokens.colors['warning.100']
			},
			closed: {
				color: tokens.colors['destructive.700'],
				background: tokens.colors['destructive.100']
			},
			other: {
				color: tokens.colors['destructive.700'],
				background: tokens.colors['destructive.100']
			},
			active: {
				color: tokens.colors['success.700'],
				background: tokens.colors['success.100']
			},
			blocked: {
				color: tokens.colors['destructive.700'],
				background: tokens.colors['destructive.100']
			},
			created: {
				color: tokens.colors['warning.700'],
				background: tokens.colors['warning.100']
			},
			deleted: {
				color: tokens.colors['destructive.700'],
				background: tokens.colors['destructive.100']
			},
			pending: {
				color: tokens.colors['warning.700'],
				background: tokens.colors['warning.100']
			},
			accepted: {
				color: tokens.colors['success.700'],
				background: tokens.colors['success.100']
			},
			declined: {
				color: tokens.colors['destructive.700'],
				background: tokens.colors['destructive.100']
			},
			payment_pending: {
				color: tokens.colors['warning.700'],
				background: tokens.colors['warning.100']
			},
			payment_received: {
				color: tokens.colors['success.700'],
				background: tokens.colors['success.100']
			},
			in_production: {
				color: tokens.colors['warning.700'],
				background: tokens.colors['warning.100']
			},
			ready: {
				color: tokens.colors['success.700'],
				background: tokens.colors['success.100']
			},
			in_transit: {
				color: tokens.colors['warning.700'],
				background: tokens.colors['warning.100']
			},
			completed: {
				color: tokens.colors['success.700'],
				background: tokens.colors['success.100']
			}
		}
	},
	defaultVariants: {
		variant: 'draft'
	}
})

export type BadgeVariants = RecipeVariants<typeof badge>
