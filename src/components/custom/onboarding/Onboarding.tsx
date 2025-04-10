'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Dialog } from '@/components/overlay/dialog'
import { Text } from '@/components/typography/text'
import { onboardingSeen } from 'api/services/onboarding'

import {
	contentLeftContiner,
	contentRightContiner,
	onboardingImage,
	onboardingImageContainer,
	onboardingItem,
	onboardingItemNumber,
	onboardingItemsContainer
} from './Onboarding.css'
import { OnboardingData, onboardingData } from './onboardingData'

type Props = {
	userRole?: string
	openOnboarding: boolean
	setOpenOnboarding: React.Dispatch<React.SetStateAction<boolean>>
}

export const Onboarding = ({ userRole, openOnboarding, setOpenOnboarding }: Props) => {
	const [currentStep, setCurrentStep] = useState(0)
	const [isMounted, setIsMounted] = useState(false)
	const data: OnboardingData[] = userRole ? onboardingData[userRole] : []
	const onboardingItemsContainerRef: any = useRef(null)
	const t = useTranslations()
	const isEndOfOnboarding = currentStep + 1 < data.length

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) {
		return null
	}

	const handleSteps = () => {
		if (isEndOfOnboarding) {
			setCurrentStep(currentStep + 1)

			if (onboardingItemsContainerRef.current) {
				onboardingItemsContainerRef.current.scrollTop += 88
			}
		} else {
			handleOnboardingSeen()
		}
	}

	const handleOnboardingSeen = async () => {
		setOpenOnboarding(false)
		if (userRole) {
			await onboardingSeen(userRole)
		}
	}

	return (
		<Dialog size="large" opened={openOnboarding} onClose={() => {}}>
			<Inline gap={12} justifyContent="space-between" flexWrap="nowrap">
				<Box className={contentLeftContiner}>
					<Stack alignItems="center" gap={4}>
						<Text fontSize="xxbig" fontWeight="bold" lineHeight="medium" textAlign="center">
							{t('Onboarding.title')}
						</Text>
						<Text textAlign="center">{t('Onboarding.description')}</Text>
					</Stack>
					<div ref={onboardingItemsContainerRef} className={onboardingItemsContainer}>
						<Stack gap={4}>
							{data?.map((item: OnboardingData, i: number) => (
								<Box
									className={onboardingItem}
									onClick={() => setCurrentStep(i)}
									style={{
										opacity: currentStep !== i ? '50%' : '100%',
										cursor: currentStep !== i ? 'pointer' : 'default'
									}}>
									<Inline gap={4} alignItems="center">
										<Box className={onboardingItemNumber}>{`${i + 1}.`}</Box>
										<Box style={{ maxWidth: '82%' }}>{t(item.title)}</Box>
									</Inline>
								</Box>
							))}
						</Stack>
					</div>
					<Stack gap={4}>
						<Button variant="primary" onClick={handleSteps}>
							{t(isEndOfOnboarding ? 'General.next' : 'Onboarding.letsBegin')}
						</Button>
						<Button variant="secondary" onClick={handleOnboardingSeen}>
							{t('Onboarding.close')}
						</Button>
					</Stack>
				</Box>
				<Box className={contentRightContiner}>
					<Box paddingX={5} paddingY={4} style={{ height: '65%' }}>
						<Stack gap={4}>
							<Text fontSize="xbig" fontWeight="semibold" textAlign="center">
								{t(data[currentStep].title)}
							</Text>
							{isEndOfOnboarding ? (
								<Text textAlign="center">{t(data[currentStep].description)}</Text>
							) : (
								<Stack gap={1}>
									<Text as="span" textAlign="center">
										{t(data[currentStep].description)}{' '}
										<Button size="auto" variant="link" href={data[currentStep].link1}>
											{t('General.here')}
										</Button>{' '}
										{t(data[currentStep].additionalDescription)}{' '}
										<Button size="auto" variant="link" href={data[currentStep].link2}>
											{t('General.here')}
										</Button>
										.
									</Text>
								</Stack>
							)}
						</Stack>
					</Box>
					<Box className={onboardingImageContainer}>
						<img alt="onboardingImage" className={onboardingImage} src={data[currentStep].image} />
					</Box>
				</Box>
			</Inline>
		</Dialog>
	)
}
