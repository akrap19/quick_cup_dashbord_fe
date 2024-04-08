'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

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
import { onboardingData } from './onboardingData'

export interface OnboardingData {
	title: string
	description: string
	image: string
}

type Props = { userType?: string }

export const Onboarding = ({ userType }: Props) => {
	const [currentStep, setCurrentStep] = useState(0)
	const [onboardingOpened, setOnboardingOpened] = useState(true)
	const [isMounted, setIsMounted] = useState(false)
	const data: OnboardingData[] = userType ? onboardingData[userType] : []
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
		setOnboardingOpened(false)
		if (userType) {
			await onboardingSeen(userType)
		}
	}

	return (
		<Dialog size="large" opened={onboardingOpened} onClose={() => {}}>
			<Inline gap={12} justifyContent="space-between" flexWrap="nowrap">
				<Box className={contentLeftContiner}>
					<Stack alignItems="center" gap={4}>
						<Text fontSize="xxbig" fontWeight="bold" lineHeight="medium">
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
										{t(item.title)}
									</Inline>
								</Box>
							))}
						</Stack>
					</div>
					<Stack gap={4}>
						<Button onClick={handleSteps}>{t(isEndOfOnboarding ? 'General.next' : 'Onboarding.letsBegin')}</Button>
						<Button onClick={handleOnboardingSeen} variant="secondary">
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
							<Text textAlign="center">{t(data[currentStep].description)}</Text>
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
