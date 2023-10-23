import { ComponentProps } from 'react'

import { BlockIcon } from 'components/icons/block-icon/BlockIcon'
import { Box } from 'components/layout/box/Box'
import { Stack } from 'components/layout/stack/Stack'

import CheckmarkBlockIcon from './assets/check-icon.svg'
import { IconButton } from './IconButton'

export default {
	title: 'UI/Inputs/IconButton',
	component: IconButton
}

export const Playground = ({ ...rest }: ComponentProps<typeof IconButton>) => {
	return (
		<IconButton {...rest} aria-label="Checkmark">
			<BlockIcon icon={CheckmarkBlockIcon} size="medium" />
		</IconButton>
	)
}

Playground.args = {
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
				<IconButton variant="primary">
					<BlockIcon icon={CheckmarkBlockIcon} size="medium" />
				</IconButton>
				<IconButton variant="secondary">
					<BlockIcon icon={CheckmarkBlockIcon} size="medium" />
				</IconButton>
				<IconButton variant="ghost">
					<BlockIcon icon={CheckmarkBlockIcon} size="medium" />
				</IconButton>
				<IconButton variant="destructive">
					<BlockIcon icon={CheckmarkBlockIcon} size="medium" />
				</IconButton>
				<IconButton variant="success">
					<BlockIcon icon={CheckmarkBlockIcon} size="medium" />
				</IconButton>
			</Stack>
			<Stack gap={4} alignItems="flex-start">
				<IconButton variant="primary" size="small">
					<BlockIcon icon={CheckmarkBlockIcon} size="small" />
				</IconButton>
				<IconButton variant="secondary" size="small">
					<BlockIcon icon={CheckmarkBlockIcon} size="small" />
				</IconButton>
				<IconButton variant="ghost" size="small">
					<BlockIcon icon={CheckmarkBlockIcon} size="small" />
				</IconButton>
				<IconButton variant="destructive" size="small">
					<BlockIcon icon={CheckmarkBlockIcon} size="small" />
				</IconButton>
				<IconButton variant="success" size="small">
					<BlockIcon icon={CheckmarkBlockIcon} size="small" />
				</IconButton>
			</Stack>
		</Box>
	)
}
