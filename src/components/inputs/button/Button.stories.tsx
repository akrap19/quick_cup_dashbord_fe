import { ComponentProps } from 'react'

import { InlineIcon } from 'components/icons/inline-icon/InlineIcon'
import { Box } from 'components/layout/box/Box'
import { Stack } from 'components/layout/stack/Stack'

import CheckmarkInlineIcon from './assets/check-inline-icon.svg'
import { Button } from './Button'

export default {
	title: 'UI/Inputs/Button',
	component: Button
}

export const Playground = ({ children, ...rest }: ComponentProps<typeof Button>) => {
	return (
		<Button {...rest}>
			<InlineIcon icon={CheckmarkInlineIcon} /> {children}
		</Button>
	)
}

Playground.args = {
	children: 'Button',
	variant: 'primary',
	size: 'large',
	disabled: false,
	// eslint-disable-next-line no-console
	onClick: () => console.log('Logging to console...')
}

export const Variants = () => {
	return (
		<Box display="flex" gap={16}>
			<Stack gap={4} alignItems="flex-start">
				<Button variant="primary">
					<InlineIcon icon={CheckmarkInlineIcon} />
					Primary
				</Button>
				<Button variant="secondary">
					<InlineIcon icon={CheckmarkInlineIcon} />
					Secondary
				</Button>
				<Button variant="ghost">
					<InlineIcon icon={CheckmarkInlineIcon} />
					Ghost
				</Button>
				<Button variant="destructive">
					<InlineIcon icon={CheckmarkInlineIcon} />
					Destructive
				</Button>
				<Button variant="success">
					<InlineIcon icon={CheckmarkInlineIcon} />
					Success
				</Button>
			</Stack>
			<Stack gap={4} alignItems="flex-start">
				<Button variant="primary" size="small">
					<InlineIcon icon={CheckmarkInlineIcon} />
					Primary
				</Button>
				<Button variant="secondary" size="small">
					<InlineIcon icon={CheckmarkInlineIcon} />
					Secondary
				</Button>
				<Button variant="ghost" size="small">
					<InlineIcon icon={CheckmarkInlineIcon} />
					Ghost
				</Button>
				<Button variant="destructive" size="small">
					<InlineIcon icon={CheckmarkInlineIcon} />
					Destructive
				</Button>
				<Button variant="success" size="small">
					<InlineIcon icon={CheckmarkInlineIcon} />
					Success
				</Button>
			</Stack>
		</Box>
	)
}

// eslint-disable-next-line sonarjs/no-identical-functions
export const LinkButton = ({ children, ...rest }: ComponentProps<typeof Button>) => {
	return (
		<Button {...rest}>
			<InlineIcon icon={CheckmarkInlineIcon} /> {children}
		</Button>
	)
}

LinkButton.args = {
	children: 'Link Button',
	variant: 'primary',
	size: 'large',
	href: '#'
}
