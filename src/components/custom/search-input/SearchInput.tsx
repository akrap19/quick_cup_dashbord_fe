/* eslint-disable no-undef */
import { BlockIcon } from '@/components/icons/block-icon'
import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'
import { searchInput } from './SearchInput.css'
import Search from '@/components/icons/block-icon/assets/search.svg'
import { iconSlot, inputWrapper } from '@/components/inputs/input-wrapper/InputWrapper.css'

type Props = InputHTMLAttributes<HTMLInputElement>

export const SearchInput = ({ ...rest }: Props) => {
	return (
		<div className={inputWrapper}>
			<div className={iconSlot}>
				<BlockIcon icon={Search} color="primary.500" />
			</div>
			<input {...rest} className={clsx(searchInput)} />
		</div>
	)
}
