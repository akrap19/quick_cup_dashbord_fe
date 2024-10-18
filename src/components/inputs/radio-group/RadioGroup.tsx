import { ChangeEvent, ChangeEventHandler, ComponentProps } from 'react'

import { Button } from 'components/inputs/button'
import { Radio } from 'components/inputs/radio'
import { Box } from 'components/layout/box'
import { Stack } from 'components/layout/stack'

type OptionProps = ComponentProps<typeof Radio>

interface Props {
	name?: string
	value?: string
	options?: OptionProps[]
	onChange?: ChangeEventHandler<HTMLInputElement>
}

export const RadioGroup = ({ name, value, options, onChange }: Props) => {
	const handleClick = (value?: string) => {
		if (onChange) {
			const event = {
				target: {
					name,
					value
				}
			} as ChangeEvent<HTMLInputElement>
			onChange(event)
		}
	}

	return (
		<Box overflow="auto" style={{ maxHeight: '58vh' }}>
			<Stack gap={2}>
				{options?.map(item => (
					<Button type="button" size="auto" variant="adaptive" onClick={() => handleClick(item.value)}>
						<Box
							key={item.value}
							padding={4}
							flex="1"
							border="thin"
							borderColor="neutral.300"
							borderRadius="small"
							backgroundColor={value === item.value ? 'primary.100' : 'shades.00'}
							position="relative">
							<Stack gap={1}>
								<Radio name={name} label={item.label} value={item.value} checked={value === item.value} />
							</Stack>
						</Box>
					</Button>
				))}
			</Stack>
		</Box>
	)
}
