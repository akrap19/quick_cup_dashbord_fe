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
import { deleteOnboarding } from 'api/services/onboarding'
import { ROUTES } from 'parameters'

import { dropdownListContainer, dropdownListItem, dropdownListItemWithAction } from './UserDropdown.css'
import CarretDownIcon from '../../icons/block-icon/assets/carret-down-icon.svg'
import CarretUpIcon from '../../icons/block-icon/assets/carret-up-icon.svg'
import { Onboarding } from '../onboarding'

interface Option {
	label?: string
	action?: any
	disabled?: boolean
}

interface Props {
	session: Session | null
	seenOnboardingSections: string[]
}

export const UserDropdown = ({ session, seenOnboardingSections }: Props) => {
	const t = useTranslations()
	const [isOpen, setIsOpen] = useState(false)
	const [openOnboarding, setOpenOnboarding] = useState(false)
	const ref = useRef<HTMLDivElement>(null)
	const { push } = useRouter()
	const userRole = session?.user?.roles[0]?.name

	const handleLogout = async () => {
		const result = await logout()

		if (result?.message === 'OK') {
			signOut({ callbackUrl: ROUTES.LOGIN })
		}
	}

	const handleDeleteOnboarding = async () => {
		if (userRole) {
			const result = await deleteOnboarding(userRole)

			if (result?.message === 'OK') {
				setOpenOnboarding(true)
			}
		}
	}

	const options: Option[] = [
		{
			label: session?.user?.email
		},
		{
			label: 'General.profileSettings',
			action: () => push(ROUTES.SETTINGS)
		},
		{
			label: 'General.onboardingFlow',
			action: () => handleDeleteOnboarding()
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
		if (userRole && !seenOnboardingSections?.includes(userRole)) {
			setOpenOnboarding(true)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<>
			{userRole && (!seenOnboardingSections?.includes(userRole) || openOnboarding) && (
				<Onboarding userRole={userRole} openOnboarding={openOnboarding} setOpenOnboarding={setOpenOnboarding} />
			)}
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
								{options?.map(option =>
									option.action ? (
										<Button size="auto" variant="adaptive" disabled={option.disabled} onClick={option.action}>
											<Box className={dropdownListItemWithAction}>
												<Text fontSize="medium" lineHeight="xlarge">
													{t(option.label)}
												</Text>
											</Box>
										</Button>
									) : (
										<Box className={dropdownListItem}>
											<Text fontSize="medium" lineHeight="xlarge">
												{t(option.label)}
											</Text>
										</Box>
									)
								)}
							</Stack>
						</Box>
					)}
				</Box>
			</div>
		</>
	)
}
