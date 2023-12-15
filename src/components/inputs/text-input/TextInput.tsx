/* eslint-disable no-undef */
import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

import { InputWrapper } from '../input-wrapper'
import {
	endIconSpacing,
	input,
	inputHasError,
	inputHasSuccess,
	startIconSpacing
} from '../input-wrapper/InputWrapper.css'

interface CustomInputProps {
	hasError?: boolean
	hasSuccess?: boolean
	endIcon?: JSX.Element
	startIcon?: JSX.Element
}

type Props = InputHTMLAttributes<HTMLInputElement> & CustomInputProps

export const TextInput = ({ hasError, hasSuccess, startIcon, endIcon, ...rest }: Props) => {
	return (
		<InputWrapper startIcon={startIcon} endIcon={endIcon}>
			<input
				{...rest}
				className={clsx(
					input,
					hasError && inputHasError,
					hasSuccess && inputHasSuccess,
					endIcon && endIconSpacing,
					startIcon && startIconSpacing
				)}
			/>
		</InputWrapper>
	)
}
