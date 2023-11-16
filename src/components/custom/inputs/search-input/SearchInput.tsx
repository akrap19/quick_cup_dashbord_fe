/* eslint-disable no-undef */
import { BlockIcon } from '@/components/icons/block-icon'
import { InputHTMLAttributes } from 'react'
import { searchInputWrapper, searchIconSlot, searchInput } from './SearchInput.css'
import SearchIcon from '@/components/icons/block-icon/assets/search-icon.svg'

type Props = InputHTMLAttributes<HTMLInputElement>

export const SearchInput = ({ ...rest }: Props) => {
	return (
		<div className={searchInputWrapper}>
			<div className={searchIconSlot}>
				<BlockIcon icon={SearchIcon} color="primary.500" />
			</div>
			<input {...rest} className={searchInput} />
		</div>
	)
}
