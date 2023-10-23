import { ChangeEvent, useState } from 'react'

import { CalendarIcon } from 'components/icons/block-icon/BlockIcon.stories'
import { Stack } from 'components/layout/stack'

import { TextInput } from './TextInput'

export default {
	title: 'UI/Inputs/TextInput',
	component: TextInput
}

export const Default = () => {
	const [value, setValue] = useState('')

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}

	return (
		<Stack gap={4}>
			<TextInput placeholder="Placeholder..." />
			<TextInput placeholder="Placeholder..." value={value || 'This input has value'} onChange={onChange} />
			<TextInput placeholder="Placeholder..." value={value || 'This input is disabled'} disabled onChange={onChange} />
			<TextInput
				placeholder="Placeholder..."
				value={value || 'This input has error'}
				hasError
				onChange={onChange}
				endIcon={<CalendarIcon />}
			/>
			<TextInput
				placeholder="Placeholder..."
				value={value || 'Trailing Icon'}
				endIcon={<CalendarIcon />}
				onChange={onChange}
			/>
			<TextInput
				placeholder="Placeholder..."
				value={value || 'Leading Icon'}
				startIcon={<CalendarIcon />}
				onChange={onChange}
			/>
		</Stack>
	)
}
