/* eslint-disable no-undef */
import { InputHTMLAttributes } from 'react'

import { BlockIcon } from '@/components/icons/block-icon'
import SearchIcon from '@/components/icons/block-icon/assets/search-icon.svg'

import { searchIconSlot, searchInput, searchInputWrapper } from './SearchInput.css'

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
