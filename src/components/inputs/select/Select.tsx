/* eslint-disable no-undef */
import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

import { BlockIcon } from 'components/icons/block-icon'

import CarretIcon from './assets/carret-icon.svg'
import { select } from './Select.css'
import { InputWrapper } from '../input-wrapper'
import { endIconSpacing, input, inputHasError, startIconSpacing } from '../input-wrapper/InputWrapper.css'

interface Option {
	value: string
	label: string
	disabled?: boolean
}

interface CustomInputProps {
	hasError?: boolean
	startIcon?: JSX.Element
	options: Array<Option>
}

type Props = InputHTMLAttributes<HTMLSelectElement> & CustomInputProps

export const Select = ({ hasError, startIcon, options, ...rest }: Props) => {
	return (
		<InputWrapper startIcon={startIcon} endIcon={<BlockIcon icon={CarretIcon} size="medium" />}>
			<select
				{...rest}
				className={clsx(select, input, hasError && inputHasError, endIconSpacing, startIcon && startIconSpacing)}>
				{options.map(option => (
					<option key={option.value} value={option.value} disabled={option.disabled}>
						{option.label}
					</option>
				))}
			</select>
		</InputWrapper>
	)
}
