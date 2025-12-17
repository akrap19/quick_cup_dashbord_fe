import { ComponentProps } from 'react'
import { PatternFormat, PatternFormatProps } from 'react-number-format'

import { TextInput } from '../text-input'

type OmittedTextInputProps = Omit<ComponentProps<typeof TextInput>, 'defaultValue' | 'type' | 'size'>
type OmittedPatternFormatProps = Omit<PatternFormatProps, 'size'>

interface Props extends OmittedPatternFormatProps, OmittedTextInputProps {
	value?: string
	size?: 'small' | 'medium' | 'large'
}

export const PatternInput = ({ size = 'medium', ...props }: Props) => {
	const CustomInput = (inputProps: any) => {
		const { size: _, ...restProps } = inputProps
		return <TextInput {...restProps} size={size} />
	}

	return <PatternFormat type="text" customInput={CustomInput as any} {...props} />
}
