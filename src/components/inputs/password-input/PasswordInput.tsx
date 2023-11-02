/* eslint-disable no-undef */
import { BlockIcon } from '@/components/icons/block-icon'
import { InputHTMLAttributes, useState } from 'react'
import { TextInput } from '../text-input'
import CrossedEyeIcon from '@/components/icons/block-icon/assets/crossed-eye.svg'
import { CustomInputProps } from '../text-input/TextInput'
import { Button } from '../button'

type Props = InputHTMLAttributes<HTMLInputElement> & CustomInputProps

export const PasswordInput = ({ hasError, ...rest }: Props) => {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible)
	}

	return (
		<TextInput
			{...rest}
			type={passwordVisible ? 'text' : 'password'}
			hasError={hasError}
			endIcon={
				<Button size="small" variant="ghost" onClick={togglePasswordVisibility}>
					<BlockIcon icon={passwordVisible ? CrossedEyeIcon : CrossedEyeIcon} />
				</Button>
			}
		/>
	)
}
