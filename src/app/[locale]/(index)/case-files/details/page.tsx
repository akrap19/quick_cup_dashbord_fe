'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Stack } from '@/components/layout/stack'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { InputInfo } from '@/components/inputs/input-info/'

const CaseFileDetailsPage = () => {
	const t = useTranslations()
	useNavbarItems({
		title: 'BH-123456',
		backLabel: 'CaseFiles.back',
		actionButton: <EditButton buttonLabel="CaseFiles.edit" buttonLink="/" />
	})

	return (
		<Box width="100%">
			<DetailsWrapper>
				<Stack gap={4}>
					<Label>{t('General.caseId')}</Label>
					<Text fontSize="small" color="neutral.800">
						BH-166233
					</Text>
				</Stack>
				<Stack gap={4}>
					<Label>{t('General.status')}</Label>
					<Text fontSize="small" color="neutral.800">
						Open
					</Text>
				</Stack>
				<Stack gap={4}>
					<Label>{t('General.barnahus')}</Label>
					<Text fontSize="small" color="neutral.800">
						{t('General.barnahusPlaceholder')}
					</Text>
				</Stack>
			</DetailsWrapper>
			<Box paddingX={10} width="100%">
				<Box
					padding={6}
					style={{ maxWidth: '60rem' }}
					backgroundColor="neutral.50"
					border="thin"
					borderColor="neutral.300">
					<Stack gap={4}>
						<Inline gap={4}>
							<Label>{t('Barnahuses.assignedMasterAdmin')}</Label>
							<InputInfo infoText="Barnahuses.assignedMasterAdminInfoText" />
						</Inline>
						<Text fontSize="small" color="neutral.800">
							{t('Barnahuses.assignedMasterAdminPlaceholder')}
						</Text>
					</Stack>
				</Box>
			</Box>
		</Box>
	)
}

export default CaseFileDetailsPage
