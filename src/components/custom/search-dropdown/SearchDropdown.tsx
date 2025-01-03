'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { BlockIcon } from '@/components/icons/block-icon'
import { Button } from '@/components/inputs/button'
import { InputWrapper } from '@/components/inputs/input-wrapper'
import { endIconSpacing, input, inputHasSuccess } from '@/components/inputs/input-wrapper/InputWrapper.css'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { Base } from 'api/models/common/base'

import { DropdownPresentationlabel } from './SearchDropdown.css'
import { SearchDropdownDrawer } from './SearchDropdownDrawer'
import CarretDownIcon from '../../icons/block-icon/assets/carret-down-icon.svg'
import CarretUpIcon from '../../icons/block-icon/assets/carret-up-icon.svg'

interface Props {
	options: Base[]
	placeholder: string
	name?: string
	hasSuccess?: boolean
	value?: string | null
	alwaysShowSearch?: boolean
	isFilter?: boolean
	setValue?: Dispatch<SetStateAction<any>>
}

export const SearchDropdown = ({
	name,
	options,
	placeholder,
	hasSuccess,
	value,
	alwaysShowSearch,
	isFilter,
	setValue
}: Props) => {
	const t = useTranslations()
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const [choosenValue, setChoosenValue] = useState<Base>()
	const presentationalLabelVariant = isFilter ? 'filterLabel' : value ? 'formLabel' : 'placeholder'

	const handleDropDownOpening = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsOpen(!isOpen)
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsOpen(false)
		}
	}

	const handleValueLabel = (id: string) => {
		const selectedOption = options?.find((option: Base) => option.id === id)

		setChoosenValue(selectedOption)
	}

	useEffect(() => {
		if (value) {
			handleValueLabel(value)
		}
		if (value === null) {
			setChoosenValue(undefined)
		}
	}, [value])

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
						color={!isFilter && hasSuccess ? 'success.500' : 'neutral.500'}
					/>
				}>
				<Stack>
					<Button size="auto" variant="adaptive" onClick={handleDropDownOpening}>
						<Box className={clsx(input, !isFilter && hasSuccess && inputHasSuccess, endIconSpacing)}>
							<Text className={DropdownPresentationlabel({ variant: presentationalLabelVariant })}>
								{choosenValue?.name ?? value ?? `${t('General.select')} ${t(placeholder)}`}
							</Text>
						</Box>
					</Button>
				</Stack>
			</InputWrapper>
			{isOpen && (
				<SearchDropdownDrawer
					options={options}
					placeholder={placeholder}
					name={name}
					alwaysShowSearch={alwaysShowSearch}
					setValue={setValue}
				/>
			)}
		</div>
	)
}
