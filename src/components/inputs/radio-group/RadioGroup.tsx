import { ChangeEventHandler, ComponentProps } from 'react'

import { Stack } from 'components/layout/stack'

import { Radio } from '../radio'

type OptionProps = ComponentProps<typeof Radio>

interface Props {
	name: string
	value: string
	onChange: ChangeEventHandler<HTMLInputElement>
	options: Array<OptionProps>
}

export const RadioGroup = ({ name, value, onChange, options }: Props) => {
	return (
		<Stack gap={2}>
			{options?.map(option => (
				<Radio
					key={option.value}
					name={name}
					label={option.label}
					value={option.value}
					checked={value === option.value}
					onChange={onChange}
				/>
			))}
		</Stack>
	)
}
