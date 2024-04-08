'use client'

import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
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
	session: Session | null
}

export const UserDropdown = ({ session }: Props) => {
	const t = useTranslations()
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const { push } = useRouter()

	const handleLogout = async () => {
		const result = await logout()

		if (result?.message === 'OK') {
			signOut({ callbackUrl: ROUTES.LOGIN })
		}
	}

	const options: Option[] = [
		{
			label: 'General.profileSettings',
			action: () => push(ROUTES.SETTINGS)
		},
		{
			label: 'General.logOut',
			action: () => handleLogout()
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
				<Box display="flex" width="100%" justifyContent="flex-end">
					<Button size="auto" variant="adaptive" onClick={handleDropDownOpening}>
						<Box borderRadius="small" padding={2} backgroundColor="neutral.150">
							<Inline gap={2} alignItems="center">
								<UserIcon size="medium" color="neutral.800" />
								<Text fontSize="medium" fontWeight="semibold" lineHeight="xlarge" color="neutral.800">
									{t(handleFullName(session?.user?.firstName, session?.user?.lastName))}
								</Text>
								<BlockIcon icon={isOpen ? CarretUpIcon : CarretDownIcon} size="medium" color="neutral.800" />
							</Inline>
						</Box>
					</Button>
				</Box>
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
