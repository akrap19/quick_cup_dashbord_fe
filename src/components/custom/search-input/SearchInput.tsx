/* eslint-disable no-undef */
import { BlockIcon } from '@/components/icons/block-icon'
import { InputHTMLAttributes } from 'react'
import { searchInput } from './SearchInput.css'
import SearchIcon from '@/components/icons/block-icon/assets/search-icon.svg'
import { iconSlot, inputWrapper } from '@/components/inputs/input-wrapper/InputWrapper.css'

type Props = InputHTMLAttributes<HTMLInputElement>

export const SearchInput = ({ ...rest }: Props) => {
	return (
		<div className={inputWrapper}>
			<div className={iconSlot}>
				<BlockIcon icon={SearchIcon} color="primary.500" />
			</div>
			<input {...rest} className={searchInput} />
		</div>
	)
}
