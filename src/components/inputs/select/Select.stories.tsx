import { ChangeEvent, useState } from 'react'

import { CalendarIcon } from 'components/icons/block-icon/BlockIcon.stories'
import { Stack } from 'components/layout/stack'

import { Select } from './Select'

export default {
	title: 'UI/Inputs/Select',
	component: Select
}

const options = [
	{ value: 'A', label: 'A', disabled: false },
	{ value: 'B', label: 'B', disabled: false },
	{ value: 'C', label: 'C', disabled: false }
]

export const Default = () => {
	const [value, setValue] = useState('')

	const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setValue(e.target.value)
	}

	return (
		<Stack gap={4}>
			<Select placeholder="Placeholder..." options={options} />
			<Select placeholder="Placeholder..." value={value} onChange={onChange} options={options} />
			<Select placeholder="Placeholder..." value={value} disabled onChange={onChange} options={options} />
			<Select placeholder="Placeholder..." value={value} hasError onChange={onChange} options={options} />
			<Select
				placeholder="Placeholder..."
				value={value}
				startIcon={<CalendarIcon />}
				onChange={onChange}
				options={options}
			/>
		</Stack>
	)
}
