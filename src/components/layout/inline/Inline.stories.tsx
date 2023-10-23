import { StoryFn } from '@storybook/react'
import { ComponentProps } from 'react'

import { Placeholder } from 'components/utils/placeholder/Placeholder'

import { Inline } from './Inline'

export default {
	title: 'UI/Layout/Inline',
	component: Inline
}

const generateRandomInteger = (min: number = 0, max: number = 100) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const Playground: StoryFn<ComponentProps<typeof Inline>> = args => {
	return (
		<Inline {...args}>
			{Array(10)
				.fill(null)
				.map((_, index) => (
					// eslint-disable-next-line react/no-array-index-key
					<Placeholder key={index} height={generateRandomInteger(20, 80)} width={generateRandomInteger(60, 120)} />
				))}
		</Inline>
	)
}

Playground.args = {
	gap: 4,
	alignItems: 'flex-start',
	justifyContent: 'center'
}
