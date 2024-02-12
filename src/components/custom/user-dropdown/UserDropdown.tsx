'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'

import { BlockIcon } from '@/components/icons/block-icon'
import { UserIcon } from '@/components/icons/user-icon'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { handleFullName } from '@/utils/handleFullName'
import { Settings } from 'api/models/settings/settings'
import { logout } from 'api/services/auth'
import { ROUTES } from 'parameters'

import { dropdownListContainer, dropdownListItem } from './UserDropdown.css'
import CarretDownIcon from '../../icons/block-icon/assets/carret-down-icon.svg'
import CarretUpIcon from '../../icons/block-icon/assets/carret-up-icon.svg'

interface Option {
	label: string
	action?: any
	disabled?: boolean
}

interface Props {
	settings: Settings
}

export const UserDropdown = ({ settings }: Props) => {
	const t = useTranslations()
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const { push } = useRouter()

	const options: Option[] = [
		{
			label: 'General.profileSettings',
			action: () => push(ROUTES.SETTINGS)
		},
		{
			label: 'General.logOut',
			action: () => logout()
		}
	]

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
		<div ref={ref}>
			<Box position="relative">
				<Button size="auto" variant="adaptive" onClick={handleDropDownOpening}>
					<Box borderRadius="small" padding={2} backgroundColor="neutral.150">
						<Inline gap={2} alignItems="center">
							<UserIcon size="medium" color="neutral.800" />
							<Text fontSize="medium" fontWeight="semibold" lineHeight="xlarge" color="neutral.800">
								{t(handleFullName(settings.firstName, settings.lastName))}
							</Text>
							<BlockIcon icon={isOpen ? CarretUpIcon : CarretDownIcon} size="medium" color="neutral.800" />
						</Inline>
					</Box>
				</Button>
				{isOpen && (
					<Box className={dropdownListContainer}>
						<Stack>
							{options.map(option => (
								<Button size="auto" variant="adaptive" disabled={option.disabled} onClick={option.action}>
									<Box className={dropdownListItem}>
										<Text fontSize="medium" lineHeight="xlarge">
											{t(option.label)}
										</Text>
									</Box>
								</Button>
							))}
						</Stack>
					</Box>
				)}
			</Box>
		</div>
	)
}
