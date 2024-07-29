'use client'

import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { BlockIcon } from '@/components/icons/block-icon'
import { Button } from '@/components/inputs/button'
import { endIconSpacing } from '@/components/inputs/input-wrapper/InputWrapper.css'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'

import {
	mobilePreviewDropdownInput,
	MobilePreviewDropdownLabel,
	mobilePreviewDropdownListContainer
} from './MobilePreview.css'
import CarretDownIcon from '../../icons/block-icon/assets/carret-down-icon.svg'
import CarretUpIcon from '../../icons/block-icon/assets/carret-up-icon.svg'

interface Props {
	options: string[]
	value: string
	handleContentType: (contentType: string) => void
}

export const MobilePreviewDropdown = ({ options, value, handleContentType }: Props) => {
	const t = useTranslations()
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const handleDropdownOption = (e: React.MouseEvent<HTMLButtonElement>, option: string) => {
		e.preventDefault()

		handleContentType(option)
	}

	const handleDropDownOpening = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setIsOpen(!isOpen)
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
		<div ref={ref} style={{ position: 'relative' }}>
			<Stack>
				<Button size="auto" variant="adaptive" onClick={handleDropDownOpening}>
					<Box className={clsx(mobilePreviewDropdownInput, endIconSpacing)}>
						<Text className={MobilePreviewDropdownLabel({ variant: 'selectedLabel' })}>{t('General.' + value)}</Text>
						<BlockIcon icon={isOpen ? CarretUpIcon : CarretDownIcon} size="large" color="neutral.800" />
					</Box>
				</Button>
			</Stack>
			{isOpen && (
				<Box className={mobilePreviewDropdownListContainer}>
					<Stack gap={4}>
						{options?.map((option: string) =>
							value === option ? (
								<Text className={MobilePreviewDropdownLabel({ variant: 'selectedLabel' })}>
									{t('General.' + option)}
								</Text>
							) : (
								<Button size="auto" variant="adaptive" onClick={e => handleDropdownOption(e, option)}>
									<Box width="100%" textAlign="left">
										<Text className={MobilePreviewDropdownLabel({ variant: 'dropDownItemLabel' })}>
											{t('General.' + option)}
										</Text>
									</Box>
								</Button>
							)
						)}
					</Stack>
				</Box>
			)}
		</div>
	)
}
