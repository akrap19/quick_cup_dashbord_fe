/* eslint-disable no-undef */
import { ComponentProps, useState } from 'react'

import { BlockIcon } from '@/components/icons/block-icon'
import CrossedEyeIcon from '@/components/icons/block-icon/assets/crossed-eye-icon.svg'
import EyeIcon from '@/components/icons/block-icon/assets/file-icon.svg'

import { Button } from '../button'
import { TextInput } from '../text-input'

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
					<BlockIcon color="neutral.500" icon={passwordVisible ? CrossedEyeIcon : EyeIcon} />
				</Button>
			}
		/>
	)
}
