import { StoryFn } from '@storybook/react'
import React, { ComponentProps } from 'react'

import { Stack } from 'components/layout/stack/Stack'

import { Heading } from './Heading'

export default {
	title: 'UI/Typography/Heading',
	component: Heading
}

export const Playground: StoryFn<ComponentProps<typeof Heading>> = ({ children, ...rest }) => {
	return <Heading {...rest}>{children}</Heading>
}

Playground.args = {
	children: 'You can play around with controls to change how I look!',
	variant: 'h1'
}

export const Variants = () => {
	return (
		<Stack gap={10}>
			<Heading variant="h1">Heading level 1</Heading>
			<Heading variant="h2">Heading level 2</Heading>
			<Heading variant="h3">Heading level 3</Heading>
			<Heading variant="h4">Heading level 4</Heading>
		</Stack>
	)
}
