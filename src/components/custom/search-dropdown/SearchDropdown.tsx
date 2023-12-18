import { BlockIcon } from '@/components/icons/block-icon'
import { sizes } from '@/components/icons/block-icon/BlockIcon.css'
import { InputWrapper } from '@/components/inputs/input-wrapper'
import {
	input,
	inputHasError,
	endIconSpacing,
	startIconSpacing
} from '@/components/inputs/input-wrapper/InputWrapper.css'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import CarretIcon from './../../icons/block-icon/assets/carret-icon.svg'

interface Props {
	hasError?: boolean
}

export const SearchDropdown = ({ hasError }: Props) => {
	const t = useTranslations()
	const ref = useRef<HTMLDivElement>(null)

	return (
		<InputWrapper endIcon={<BlockIcon icon={CarretIcon} size="medium" />}>
			<div className={clsx(input, hasError && inputHasError, endIconSpacing)} ref={ref}></div>
		</InputWrapper>
	)
}
