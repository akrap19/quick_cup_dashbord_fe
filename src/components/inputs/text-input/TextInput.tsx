/* eslint-disable no-undef */
import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

import { InputWrapper } from '../input-wrapper'
import { endIconSpacing, input, inputHasError, startIconSpacing } from '../input-wrapper/InputWrapper.css'

interface CustomInputProps {
	hasError?: boolean
	endIcon?: JSX.Element
	startIcon?: JSX.Element
}

type Props = InputHTMLAttributes<HTMLInputElement> & CustomInputProps

export const TextInput = ({ hasError, startIcon, endIcon, ...rest }: Props) => {
	return (
		<InputWrapper startIcon={startIcon} endIcon={endIcon}>
			<input
				{...rest}
				className={clsx(input, hasError && inputHasError, endIcon && endIconSpacing, startIcon && startIconSpacing)}
			/>
		</InputWrapper>
	)
}
