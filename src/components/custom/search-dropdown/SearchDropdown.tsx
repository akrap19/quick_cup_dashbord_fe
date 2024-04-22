'use client'

import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import qs from 'query-string'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDebounce } from 'rooks'

import { BlockIcon } from '@/components/icons/block-icon'
import { Button } from '@/components/inputs/button'
import { InputWrapper } from '@/components/inputs/input-wrapper'
import { endIconSpacing, input, inputHasSuccess } from '@/components/inputs/input-wrapper/InputWrapper.css'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Base } from 'api/models/common/base'

import { dropdownListContainer, dropdownListItem, dropdownListItemsContainer } from './SearchDropdown.css'
import CarretDownIcon from '../../icons/block-icon/assets/carret-down-icon.svg'
import CarretUpIcon from '../../icons/block-icon/assets/carret-up-icon.svg'
import { SearchInput } from '../inputs/search-input'
import { NoResult } from '../no-result'

interface Props {
	options: Base[]
	placeholder: string
	name?: string
	hasSuccess?: boolean
	value?: string
}

export const SearchDropdown = ({ name, options, placeholder, hasSuccess, value }: Props) => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const formContext = useFormContext()
	const { push } = useRouter()
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const handleFilterChange = (filter: string, value: string) => {
		const current = qs.parse(searchParams.toString())
		const query = { ...current, [filter]: value }
		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query
			},
			{ skipEmptyString: true }
		)

		push(url)
	}

	const debouncedFilterChange = useDebounce(handleFilterChange, 300)

	const handleDropdownOption = (e: React.MouseEvent<HTMLButtonElement>, option: Base) => {
		e.preventDefault()

		if (name) {
			formContext.setValue(name, option.id)
			formContext.trigger(name)
			setIsOpen(!isOpen)
		}
	}

	const handleDropDownOpening = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsOpen(!isOpen)
	}

	const handleValueLabel = (id: string) => {
		const selectedOption = options?.find(option => option.id === id)
		return selectedOption?.name ?? id
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
		<div ref={ref}>
			<InputWrapper
				endIcon={
					<BlockIcon
						icon={isOpen ? CarretUpIcon : CarretDownIcon}
						size="medium"
						color={hasSuccess ? 'success.500' : 'neutral.500'}
					/>
				}>
				<Stack>
					<Button size="auto" variant="adaptive" onClick={handleDropDownOpening}>
						<Box className={clsx(input, hasSuccess && inputHasSuccess, endIconSpacing)}>
							<Text fontSize="small" lineHeight="medium" color={value ? 'neutral.800' : 'neutral.300'}>
								{value ? handleValueLabel(value) : `${t('General.select')} ${t(placeholder)}`}
							</Text>
						</Box>
					</Button>
				</Stack>
			</InputWrapper>
			{isOpen && (
				<Box className={dropdownListContainer}>
					<Stack gap={2}>
						{options.length > 5 && (
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
								{options && options.length > 0 ? (
									options.map(option => (
										<Button size="auto" variant="adaptive" onClick={e => handleDropdownOption(e, option)}>
											<Box className={dropdownListItem}>
												<Text fontSize="small">{option.name}</Text>
											</Box>
										</Button>
									))
								) : (
									<NoResult
										size="small"
										noResoultMessage={t(options ? 'General.noResoultMessage' : 'General.searchMinInstructions')}
									/>
								)}
							</Stack>
						</Box>
					</Stack>
				</Box>
			)}
		</div>
	)
}
