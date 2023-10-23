import { StoryFn } from '@storybook/react'
import React, { ComponentProps } from 'react'

import { Stack } from 'components/layout/stack/Stack'

import { Text } from './Text'

export default {
	title: 'UI/Typography/Text',
	component: Text
}

export const Playground: StoryFn<ComponentProps<typeof Text<'p'>>> = ({ children, ...rest }) => {
	return <Text {...rest}>{children}</Text>
}

Playground.args = {
	children: 'You can play around with controls to change how I look!',
	fontSize: 'medium',
	lineHeight: 'large',
	fontWeight: 'regular',
	textAlign: 'left',
	color: 'shades.100',
	textTransform: 'none',
	textDecoration: 'none',
	fontStyle: 'normal'
}

export const Variants = () => {
	return (
		<Stack gap={10}>
			<Text variant="h1">I&apos;m an HTML &quot;p&quot; element that looks like heading level 1</Text>
			<Text variant="h2">I&apos;m an HTML &quot;p&quot; element that looks like heading level 2</Text>
			<Text variant="h3">I&apos;m an HTML &quot;p&quot; element that looks like heading level 3</Text>
			<Text variant="h4">I&apos;m an HTML &quot;p&quot; element that looks like heading level 4</Text>
			<Text>By default I&apos;m a simple bodytext</Text>
		</Stack>
	)
}

export const ElementTypes = () => {
	return (
		<Stack gap={10}>
			<Text>By default I&apos;m rendered as HTML &quot;p&quot; element</Text>
			<Text as="strong">I am rendered as HTML &quot;strong&quot; element</Text>
			<Text as="span">I am rendered as HTML &quot;span&quot; element</Text>
		</Stack>
	)
}
