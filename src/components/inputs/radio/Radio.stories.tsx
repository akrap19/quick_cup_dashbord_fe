import { ChangeEvent, useState } from 'react'

import { Stack } from 'components/layout/stack'

import { Radio } from './Radio'

export default {
	title: 'UI/Inputs/Radio',
	component: Radio
}

export const Default = () => {
	const [value, setValue] = useState('')

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	return (
		<Stack gap={3}>
			<Radio name="radio" value="A" label="Radio Button" onChange={handleOnChange} checked={value === 'A'} />
			<Radio name="radio" value="B" label="Radio Button" onChange={handleOnChange} checked={value === 'B'} />
			<Radio name="radio" value="C" label="Radio Button" onChange={handleOnChange} checked={value === 'C'} />
		</Stack>
	)
}
