'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { ManageJourneyIntroWrapper } from '@/components/custom/layouts/manage-journey/ManageJourneyIntroWrapper'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useStepsStore } from '@/store/steps'

interface Props {
	section: string
}

export const ContentSaved = ({ section }: Props) => {
	const t = useTranslations()
	const router = useRouter()
	const { setCurrentStep } = useStepsStore()

	return (
		<Box paddingTop={6}>
			<Box paddingX={6} paddingTop={6} borderTop="thin" borderColor="neutral.300">
				<ManageJourneyIntroWrapper>
					<Stack gap={6} alignItems="center">
						<Text fontSize="xbig" fontWeight="semibold" color="neutral.800">
							{t('ManageContent.publishedTitle', { section: section })}
						</Text>
						<Text fontSize="small" color="neutral.800" textAlign="center">
							{t('ManageContent.publishedDescription', { section: section })}
						</Text>
						<Box width="100%" style={{ maxWidth: '20.5rem' }}>
							<Stack gap={6}>
								<Button type="submit" onClick={() => setCurrentStep(1)}>
									{t('ManageContent.addAnother', { section: section })}
								</Button>
								<Button onClick={() => router.back()} variant="secondary">
									{t('ManageContent.backToContentPage')}
								</Button>
							</Stack>
						</Box>
					</Stack>
				</ManageJourneyIntroWrapper>
			</Box>
		</Box>
	)
}
