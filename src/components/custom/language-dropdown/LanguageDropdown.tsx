'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'

import { BlockIcon } from '@/components/icons/block-icon'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'

import { dropdownListContainer, dropdownListItem } from './LanguageDropdown.css'
import CarretDownIcon from '../../icons/block-icon/assets/carret-down-icon.svg'
import CarretUpIcon from '../../icons/block-icon/assets/carret-up-icon.svg'
import { Base } from 'api/models/common/base'

export const LanguageDropdown = () => {
	const t = useTranslations()
	const pathname = usePathname()
	const currentPathSegment = pathname.split('/')[1]
	const [isOpen, setIsOpen] = useState(false)
	const [currentLanguage, setCurrentLanguage] = useState('en')
	const ref = useRef<HTMLDivElement>(null)
	const { push, refresh } = useRouter()

	const handleLanguageChange = (langugeShort: string) => {
		const pathSegments = pathname.split('/')
		pathSegments[1] = langugeShort
		setCurrentLanguage(langugeShort)

		push(pathSegments.join('/'))
		refresh()
	}

	const languages: Base[] = [
		{ id: 'en', name: 'Languages.en' },
		{ id: 'sv', name: 'Languages.sv' },
		{ id: 'bg', name: 'Languages.bg' },
		{ id: 'de', name: 'Languages.de' },
		{ id: 'dk', name: 'Languages.dk' },
		{ id: 'ee', name: 'Languages.ee' },
		// { id: 'slo', name: 'Languages.slo' },
		{ id: 'esp', name: 'Languages.esp' },
		{ id: 'fi', name: 'Languages.fi' },
		{ id: 'is', name: 'Languages.is' },
		{ id: 'lt', name: 'Languages.lt' }
		// { id: 'lv', name: 'Languages.lv' },
		// { id: 'no', name: 'Languages.no' },
		// { id: 'pl', name: 'Languages.pl' }
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
		handleLanguageChange(currentPathSegment)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<>
			<div ref={ref}>
				<Box position="relative">
					<Box display="flex" width="100%" justifyContent="flex-end">
						<Button size="auto" variant="adaptive" onClick={handleDropDownOpening}>
							<Box borderRadius="small" padding={2} backgroundColor="neutral.150" style={{ minWidth: '130px' }}>
								<Inline gap={2} alignItems="center" justifyContent="space-between">
									<Text fontSize="medium" fontWeight="semibold" lineHeight="xlarge" color="neutral.800">
										{t(`Languages.${currentLanguage}`)}
									</Text>
									<BlockIcon icon={isOpen ? CarretUpIcon : CarretDownIcon} size="medium" color="neutral.800" />
								</Inline>
							</Box>
						</Button>
					</Box>
				</Box>
				{isOpen && (
					<Box className={dropdownListContainer}>
						<Stack>
							{languages
								.filter(language => language.id !== currentLanguage)
								?.map(language => (
									<Button
										key={language.id}
										size="auto"
										variant="adaptive"
										onClick={() => handleLanguageChange(language?.id)}>
										<Box className={dropdownListItem}>
											<Text fontSize="medium" lineHeight="xlarge">
												{t(language.name)}
											</Text>
										</Box>
									</Button>
								))}
						</Stack>
					</Box>
				)}
			</div>
		</>
	)
}
