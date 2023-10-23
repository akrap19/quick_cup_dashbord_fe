import { ChangeEvent, useState } from 'react'

import { Stack } from 'components/layout/stack'

import { Checkbox } from './Checkbox'

export default {
	title: 'UI/Inputs/Checkbox',
	component: Checkbox
}

export const Default = () => {
	const [values, setValue] = useState<Array<string>>([])

	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target

		if (values.includes(value)) {
			setValue(prevState => prevState.filter(item => item !== value))
			return
		}

		setValue(prevState => [...prevState, event.target.value])
	}

	return (
		<Stack gap={3}>
			<Checkbox name="checkbox" value="A" label="Checkbox A" onChange={handleOnChange} checked={values.includes('A')} />
			<Checkbox name="checkbox" value="B" label="Checkbox B" onChange={handleOnChange} checked={values.includes('B')} />
			<Checkbox name="checkbox" value="C" label="Checkbox C" onChange={handleOnChange} checked={values.includes('C')} />
		</Stack>
	)
}
