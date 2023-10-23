import { StoryFn } from '@storybook/react'
import { ComponentProps } from 'react'

import { Box } from './Box'

export default {
	title: 'UI/Layout/Box',
	component: Box
}

export const Playground: StoryFn<ComponentProps<typeof Box<'div'>>> = ({ children, ...rest }) => {
	return <Box {...rest}>{children}</Box>
}

Playground.args = {
	children: 'You can play around with controls to change how I look!',
	padding: 10
}

export const WithPadding = () => (
	<Box padding={4} boxShadow="medium" borderRadius="medium">
		Simple Box component with &quot;xlarge&quot; padding
	</Box>
)

export const WithResponsivePadding = () => (
	<Box padding={{ mobile: 2, tablet: 3, desktop: 4 }} boxShadow="medium" borderRadius="medium">
		Simple Box component with padding that changes based on screen size
	</Box>
)

export const WithComponentAs = () => (
	<Box as="a" href="#" target="_self" padding={4}>
		This Box will act as HTML anchor
	</Box>
)

export const WithFlexProperties = () => (
	<Box display="flex" justifyContent="space-between" padding={4} boxShadow="medium" borderRadius="medium">
		<Box padding={5} borderRadius="full">
			Left
		</Box>
		<Box padding={5} borderRadius="full">
			Right
		</Box>
	</Box>
)
