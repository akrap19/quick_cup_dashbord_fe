/* eslint-disable no-undef */
import { ComponentProps, MouseEvent, useState } from 'react'

import { BlockIcon } from '@/components/icons/block-icon'
import CrossedEyeIcon from '@/components/icons/block-icon/assets/crossed-eye-icon.svg'
import EyeIcon from '@/components/icons/block-icon/assets/eye-icon.svg'

import { Button } from '../button'
import { TextInput } from '../text-input'

type Props = ComponentProps<typeof TextInput>

export const PasswordInput = ({ hasError, hasSuccess, ...rest }: Props) => {
	const [passwordVisible, setPasswordVisible] = useState(false)
	const endIconColor = hasError ? 'destructive.500' : hasSuccess ? 'success.500' : 'neutral.500'

	const togglePasswordVisibility = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setPasswordVisible(!passwordVisible)
	}

	return (
		<TextInput
			{...rest}
			type={passwordVisible ? 'text' : 'password'}
			hasError={hasError}
			hasSuccess={hasSuccess}
			endIcon={
				<Button size="small" variant="adaptive" onClick={togglePasswordVisibility}>
					<BlockIcon size="medium" color={endIconColor} icon={passwordVisible ? EyeIcon : CrossedEyeIcon} />
				</Button>
			}
		/>
	)
}
