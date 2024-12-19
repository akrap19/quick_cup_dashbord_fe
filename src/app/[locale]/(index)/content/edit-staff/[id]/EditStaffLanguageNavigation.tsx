'use client'

import { useTranslations } from 'next-intl'

import { ManageJourneyWrapper } from '@/components/custom/layouts/manage-journey'
import { Loader } from '@/components/custom/loader/Loader'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useSteps } from '@/hooks/use-steps'
import { useNavbarItemsStore } from '@/store/navbar'
import { Staff } from 'api/models/content/staff'

import { EditStaffForm } from './EditStaffForm'
import { Language } from 'api/models/language/language'
import { useStepsStore } from '@/store/steps'
import { PreviewAndPublish } from './PreviewAndPublish'
import { useEffect } from 'react'
import { useManageContentAdd } from '@/store/manage-content-add'

interface Props {
	staff: Staff
	language: Language
	languages: Language[]
}

export const EditStaffLanguageNavigation = ({ staff, language }: Props) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()
	const { currentStep } = useStepsStore()
	const { setImagesToDisplay } = useManageContentAdd()
	const defaultImages = staff?.staffImages?.map(staffImage => staffImage?.url)

	useNavbarItems({
		title: 'ManageContent.editStaff',
		backLabel: 'ManageContent.back'
	})

	useSteps({
		totalSteps: 2,
		currentStep: 1
	})

	useEffect(() => {
		setImagesToDisplay(defaultImages)
	}, [])

	return (
		<Box width="100%">
			{navbarIsLoading ? (
				<Loader />
			) : (
				<ManageJourneyWrapper>
					{currentStep === 1 && (
						<Box paddingTop={6}>
							<Stack gap={6}>
								<Stack gap={4}>
									<Box display="flex" justify="center">
										<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
											{t('ManageContent.editStaff')}
										</Text>
									</Box>
									<Box display="flex" justify="center" textAlign="center">
										<Box style={{ maxWidth: '33rem' }}>
											<Text fontSize="small" color="neutral.800">
												{t('ManageContent.editStaffDescription')}
											</Text>
										</Box>
									</Box>
								</Stack>
								<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
									<EditStaffForm staffItem={staff} language={language} />
								</Box>
							</Stack>
						</Box>
					)}
					{currentStep === 2 && <PreviewAndPublish language={language} />}
				</ManageJourneyWrapper>
			)}
		</Box>
	)
}
