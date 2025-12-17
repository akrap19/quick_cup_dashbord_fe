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

type InputSize = 'small' | 'medium' | 'large'

interface CustomInputProps {
	hasError?: boolean
	hasSuccess?: boolean
	endIcon?: JSX.Element
	startIcon?: JSX.Element
	size?: InputSize
}

type BaseInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>
type Props = BaseInputProps & CustomInputProps

export const TextInput = ({ hasError, hasSuccess, startIcon, endIcon, size = 'medium', ...rest }: Props) => {
	return (
		<InputWrapper startIcon={startIcon} endIcon={endIcon}>
			<input
				{...rest}
				className={clsx(
					input({ size }),
					hasError && inputHasError,
					hasSuccess && inputHasSuccess,
					endIcon && endIconSpacing,
					startIcon && startIconSpacing
				)}
			/>
		</InputWrapper>
	)
}
