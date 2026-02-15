'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import qs from 'query-string'
import React, { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDebounce } from 'rooks'

import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Base } from 'api/models/common/base'

import {
	dropdownListContainer,
	dropdownListItem,
	dropdownListItemClear,
	dropdownListItemsContainer
} from './SearchDropdown.css'
import { SearchInput } from '../inputs/search-input'
import { NoResult } from '../no-result'

interface Props {
	options: Base[]
	placeholder: string
	name?: string
	alwaysShowSearch?: boolean
	setValue?: Dispatch<SetStateAction<any>>
	width?: number
	value?: string | number | null
	onClose?: () => void
}

export const SearchDropdownDrawer = ({
	name,
	options,
	placeholder,
	alwaysShowSearch,
	setValue,
	width,
	value,
	onClose
}: Props) => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const formContext = useFormContext()
	const { replace } = useRouter()
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

	const handleClearOption = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()

		if (name) {
			if (formContext) {
				formContext.setValue(name, null)
				formContext.trigger(name)
			} else if (setValue) {
				setValue(null)
			}
		}
		if (onClose) {
			onClose()
		}
	}

	const handleDropdownOption = (e: React.MouseEvent<HTMLButtonElement>, option: Base) => {
		e.preventDefault()

		if (name) {
			if (formContext) {
				formContext.setValue(name, option.id)
				formContext.trigger(name)
			} else if (setValue) {
				setValue(option)
			}
		}
		if (onClose) {
			onClose()
		}
	}

	const filteredOptions = options?.filter(option => option.id !== value) || []
	const hasOptions = filteredOptions.length > 0
	const hasValue = value !== null && value !== undefined && value !== ''

	return (
		<Box className={dropdownListContainer} style={width ? { width: `${width}px` } : undefined}>
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
						{hasValue && (
							<Button size="auto" variant="adaptive" onClick={handleClearOption}>
								<Box className={dropdownListItemClear}>
									<Text fontSize="small">{t('General.clear')}</Text>
								</Box>
							</Button>
						)}
						{hasOptions ? (
							filteredOptions?.map(option => (
								<Button key={option.id} size="auto" variant="adaptive" onClick={e => handleDropdownOption(e, option)}>
									<Box className={dropdownListItem}>
										<Text fontSize="small">{t(option.name)}</Text>
									</Box>
								</Button>
							))
						) : !hasValue ? (
							<NoResult size="small" noResoultMessage={t(noResultMessage)} />
						) : null}
					</Stack>
				</Box>
			</Stack>
		</Box>
	)
}
