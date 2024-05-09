/* eslint-disable no-undef */
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { InputHTMLAttributes } from 'react'

import { BlockIcon } from 'components/icons/block-icon'

import CarretIcon from './assets/carret-icon.svg'
import { SelectVariants, select } from './Select.css'
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
	value?: string
}

type Props = InputHTMLAttributes<HTMLSelectElement> & SelectVariants & CustomInputProps

export const Select = ({ hasError, startIcon, sizes, options, value, ...rest }: Props) => {
	const t = useTranslations()

	return (
		<InputWrapper startIcon={startIcon} endIcon={<BlockIcon icon={CarretIcon} size="medium" />}>
			<select
				{...rest}
				value={value}
				className={clsx(
					select({
						sizes
					}),
					input,
					hasError && inputHasError,
					endIconSpacing,
					startIcon && startIconSpacing
				)}>
				{options.map(option => (
					<option key={option.value} value={option.value} disabled={option.disabled}>
						{t(option.label)}
					</option>
				))}
			</select>
		</InputWrapper>
	)
}
