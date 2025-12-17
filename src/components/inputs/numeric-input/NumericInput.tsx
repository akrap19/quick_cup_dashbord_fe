import { ComponentProps } from 'react'
import { NumericFormat, NumericFormatProps } from 'react-number-format'

import { TextInput } from '../text-input'

// Omit properties that NumericFormat and TextInput are not sharing
type OmittedTextInputProps = Omit<ComponentProps<typeof TextInput>, 'defaultValue' | 'type' | 'size'>

interface Props extends NumericFormatProps, OmittedTextInputProps {
	value?: string
}

export const NumericInput = (props: Props) => {
	return <NumericFormat type="text" customInput={TextInput as any} {...props} />
}
