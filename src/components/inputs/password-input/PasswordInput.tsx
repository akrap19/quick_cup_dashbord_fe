/* eslint-disable no-undef */
import { BlockIcon } from '@/components/icons/block-icon'
import { InputHTMLAttributes, useState } from 'react'
import { TextInput } from '../text-input'
import HiddenPasswordIcon from '/public/images/hidden-password.svg'

interface CustomInputProps {
	hasError?: boolean
}

type Props = InputHTMLAttributes<HTMLInputElement> & CustomInputProps

export const PasswordInput = ({ hasError, ...rest }: Props) => {
	const [passwordVisible, setPasswordVisible] = useState(false)

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible)
	}

	return (
		<TextInput
			{...rest}
			type={passwordVisible ? 'text' : 'password'}
			hasError={hasError}
			endIcon={
				<BlockIcon
					icon={passwordVisible ? HiddenPasswordIcon : HiddenPasswordIcon}
					cursor="pointer"
					onClick={togglePasswordVisibility}
				/>
			}
		/>
	)
}
