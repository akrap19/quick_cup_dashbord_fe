import { StoryFn } from '@storybook/react'
import React, { ComponentProps } from 'react'

import { Placeholder } from 'components/utils/placeholder/Placeholder'

import { Container } from './Container'
import { Stack } from '../stack/Stack'

export default {
	title: 'UI/Layout/Container',
	component: Container
}

export const Playground: StoryFn<ComponentProps<typeof Container>> = args => {
	return (
		<Container {...args}>
			<Stack gap={10}>
				<Placeholder width="auto" height="100px" />
				<Placeholder width="auto" height="100px" />
				<Placeholder width="auto" height="100px" />
				<Placeholder width="auto" height="100px" />
				<Placeholder width="auto" height="100px" />
				<Placeholder width="auto" height="100px" />
				<Placeholder width="auto" height="100px" />
			</Stack>
		</Container>
	)
}

Playground.args = {
	width: 'medium'
}
