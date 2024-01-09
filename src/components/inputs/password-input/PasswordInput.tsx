/* eslint-disable no-undef */
import { ComponentProps, MouseEvent, useState } from 'react'

import { BlockIcon } from '@/components/icons/block-icon'
import CrossedEyeIcon from '@/components/icons/block-icon/assets/crossed-eye-icon.svg'
import EyeIcon from '@/components/icons/block-icon/assets/eye-icon.svg'
import { CheckIcon } from '@/components/icons/check-icon'

import { Button } from '../button'
import { TextInput } from '../text-input'

type Props = ComponentProps<typeof TextInput>

export const PasswordInput = ({ hasError, hasSuccess, ...rest }: Props) => {
	const [passwordVisible, setPasswordVisible] = useState(false)
  
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
				!hasSuccess ? (
					<Button size="small" variant="adaptive" onClick={togglePasswordVisibility}>
						<BlockIcon
							size="medium"
							color={hasError ? 'destructive.500' : 'neutral.500'}
							icon={passwordVisible ? EyeIcon : CrossedEyeIcon}
						/>
					</Button>
				) : (
					<CheckIcon size="medium" color="success.500" />
				)
			}
		/>
	)
}
