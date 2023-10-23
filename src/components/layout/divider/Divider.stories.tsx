import { StoryFn } from '@storybook/react'
import { ComponentProps } from 'react'

import { Divider } from './Divider'
import { Box } from '../box/Box'
import { Stack } from '../stack/Stack'

export default {
	title: 'UI/Layout/Divider',
	component: Divider
}

export const Default: StoryFn<ComponentProps<typeof Divider>> = () => {
	return (
		<Stack gap={4}>
			<Box style={{ height: '50px', border: '1px solid' }} />
			<Divider />
			<Box style={{ height: '50px', border: '1px solid' }} />
		</Stack>
	)
}
