/* eslint-disable no-undef */
import { BlockIcon } from '@/components/icons/block-icon'
import { ComponentProps, useState } from 'react'
import { TextInput } from '../text-input'
import CrossedEyeIcon from '@/components/icons/block-icon/assets/crossed-eye-icon.svg'
import { Button } from '../button'

type Props = ComponentProps<typeof TextInput>

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
				<Button size="small" variant="adaptive" onClick={togglePasswordVisibility}>
					<BlockIcon color="neutral.500" icon={passwordVisible ? CrossedEyeIcon : CrossedEyeIcon} />
				</Button>
			}
		/>
	)
}
