'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import qs from 'query-string'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDebounce } from 'rooks'

import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Base } from 'api/models/common/base'

import { dropdownListContainer, dropdownListItem, dropdownListItemsContainer } from './SearchDropdown.css'
import { SearchInput } from '../inputs/search-input'
import { NoResult } from '../no-result'

interface Props {
	options: Base[]
	placeholder: string
	name?: string
	alwaysShowSearch?: boolean
	setValue?: Dispatch<SetStateAction<any>>
}

export const SearchDropdownDrawer = ({ name, options, placeholder, alwaysShowSearch, setValue }: Props) => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const formContext = useFormContext()
	const { replace } = useRouter()
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const currentSearchParamas = qs.parse(searchParams.toString())
	const searchParamsValuelength = name ? (currentSearchParamas[name] ? currentSearchParamas[name]?.length : 0) : 0
	const noResultMessage =
		options?.length === 0 && !alwaysShowSearch
			? 'General.noResoultMessage'
			: searchParamsValuelength && searchParamsValuelength > 2
				? 'General.noResoultMessage'
				: 'General.searchMinInstructions'

	const handleFilterChange = (filter: string, value: string) => {
		const query = { ...currentSearchParamas, [filter]: value }
		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query
			},
			{ skipEmptyString: true }
		)

		replace(url)
	}

	const debouncedFilterChange = useDebounce(handleFilterChange, 300)

	const handleDropdownOption = (e: React.MouseEvent<HTMLButtonElement>, option: Base) => {
		e.preventDefault()

		if (name) {
			if (formContext) {
				formContext.setValue(name, option.id)
				formContext.trigger(name)
				setIsOpen(!isOpen)
			} else if (setValue) {
				setValue(option)
			}
		}
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<Box className={dropdownListContainer}>
			<Stack gap={2}>
				{(alwaysShowSearch || options?.length > 5) && (
					<Box width="100%" paddingX={1}>
						<SearchInput
							name={name}
							defaultValue={searchParams.get(name ?? '') || ''}
							placeholder={`${t('General.search')} ${t(placeholder)}`}
							onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
						/>
					</Box>
				)}
				<Box className={dropdownListItemsContainer}>
					<Stack gap={1}>
						{options && options?.length > 0 ? (
							options?.map(option => (
								<Button size="auto" variant="adaptive" onClick={e => handleDropdownOption(e, option)}>
									<Box className={dropdownListItem}>
										<Text fontSize="small">{option.name}</Text>
									</Box>
								</Button>
							))
						) : (
							<NoResult size="small" noResoultMessage={t(noResultMessage)} />
						)}
					</Stack>
				</Box>
			</Stack>
		</Box>
	)
}
