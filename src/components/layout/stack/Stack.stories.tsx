import { StoryFn } from '@storybook/react'
import React, { ComponentProps } from 'react'

import { Placeholder } from 'components/utils/placeholder/Placeholder'

import { Stack } from './Stack'

export default {
	title: 'UI/Layout/Stack',
	component: Stack
}

export const Playground: StoryFn<ComponentProps<typeof Stack>> = args => {
	return (
		<Stack {...args}>
			<Placeholder width="320px" height="100px" />
			<Placeholder width="320px" height="100px" />
			<Placeholder width="320px" height="100px" />
		</Stack>
	)
}

Playground.args = {
	gap: 4,
	alignItems: 'flex-start',
	justifyContent: 'center'
}

export const Nested = () => (
	<Stack gap={16}>
		<Placeholder width="320px" height="100px" />
		<Placeholder width="320px" height="100px" />
		<Placeholder width="320px" height="100px" />
		<Stack gap={3}>
			<Placeholder width="320px" height="100px" />
			<Placeholder width="320px" height="100px" />
		</Stack>
	</Stack>
)
