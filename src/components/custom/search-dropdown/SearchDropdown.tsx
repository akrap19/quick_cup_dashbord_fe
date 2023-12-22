'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react'

import { BlockIcon } from '@/components/icons/block-icon'
import { Button } from '@/components/inputs/button'
import { InputWrapper } from '@/components/inputs/input-wrapper'
import { endIconSpacing, input, inputHasError } from '@/components/inputs/input-wrapper/InputWrapper.css'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'

import { dropdownListContainer, dropdownListItem } from './SearchDropdown.css'
import CarretDownIcon from '../../icons/block-icon/assets/carret-down-icon.svg'
import CarretUpIcon from '../../icons/block-icon/assets/carret-up-icon.svg'
import { SearchInput } from '../inputs/search-input'

interface Option {
	value: string
	label: string
}

interface Props {
	options: Option[]
	dropdownPlaceholder: string
	searchPlaceholder: string
	hasError?: boolean
	value?: string
	onChange?: ChangeEventHandler<HTMLInputElement>
}

export const SearchDropdown = ({
	options,
	dropdownPlaceholder,
	searchPlaceholder,
	hasError,
	value,
	onChange
}: Props) => {
	const t = useTranslations()
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const handleDropdownOption = (e: React.MouseEvent<HTMLButtonElement>, option: Option) => {
		e.preventDefault()
		const syntheticEvent = {
			target: {
				value: option.value
			}
		}

		if (onChange) {
			onChange(syntheticEvent as ChangeEvent<HTMLInputElement>)
			setIsOpen(!isOpen)
		}
	}

	const handleDropDownOpening = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsOpen(!isOpen)
	}

	const handleValueLabel = (value: string) => {
		const selectedOption = options.find(option => option.value === value)
		return selectedOption?.label
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
			<InputWrapper endIcon={<BlockIcon icon={isOpen ? CarretUpIcon : CarretDownIcon} size="medium" />}>
				<Stack>
					<Button size="auto" variant="adaptive" onClick={handleDropDownOpening}>
						<Box className={clsx(input, hasError && inputHasError, endIconSpacing)}>
							<Text fontSize="small" lineHeight="medium" color={value ? 'neutral.800' : 'neutral.300'}>
								{value ? handleValueLabel(value) : `${t('General.select')} ${t(dropdownPlaceholder)}`}
							</Text>
						</Box>
					</Button>
				</Stack>
			</InputWrapper>
			{isOpen && (
				<Box className={dropdownListContainer}>
					<Stack gap={2}>
						<Box width="100%" paddingX={1}>
							<SearchInput placeholder={`${t('General.search')} ${t(searchPlaceholder)}`} />
						</Box>
						<Stack gap={1}>
							{options.map(option => (
								<Button size="auto" variant="adaptive" onClick={e => handleDropdownOption(e, option)}>
									<Box className={dropdownListItem}>
										<Text fontSize="small">{option.label}</Text>
									</Box>
								</Button>
							))}
						</Stack>
					</Stack>
				</Box>
			)}
		</div>
	)
}
