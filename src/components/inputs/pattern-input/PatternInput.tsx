import { ComponentProps } from 'react'
import { PatternFormat, PatternFormatProps } from 'react-number-format'

import { TextInput } from '../text-input'

// Omit properties that NumericFormat and TextInput are not sharing
type OmittedTextInputProps = Omit<ComponentProps<typeof TextInput>, 'defaultValue' | 'type'>

interface Props extends PatternFormatProps, OmittedTextInputProps {
	value?: string
}

export const PatternInput = (props: Props) => {
	return <PatternFormat type="text" customInput={TextInput} {...props} />
}
