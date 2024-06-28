import { ChangeEvent, ComponentProps } from 'react'

import { Stack } from 'components/layout/stack'

import { Checkbox } from '../checkbox'

type OptionProps = ComponentProps<typeof Checkbox>

interface Props {
	name: string
	value: Array<string>
	onChange: (values: Array<string>) => void
	options: Array<OptionProps>
}

export const CheckboxGroup = ({ name, value, onChange, options }: Props) => {
	const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const checkboxValue = event.target.value

		if (value.includes(checkboxValue)) {
			onChange(value.filter(item => item !== checkboxValue))
			return
		}

		onChange([...value, checkboxValue])
	}

	return (
		<Stack gap={2}>
			{options?.map(option => (
				<Checkbox
					key={option.value}
					name={name}
					label={option.label}
					value={option.value}
					checked={option.value ? value.includes(option.value) : false}
					onChange={handleOnChange}
				/>
			))}
		</Stack>
	)
}
