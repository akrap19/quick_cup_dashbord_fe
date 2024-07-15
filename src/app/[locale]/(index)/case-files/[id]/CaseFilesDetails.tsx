'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { InputInfo } from '@/components/inputs/input-info'
import { Label } from '@/components/inputs/label'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { CaseFiles } from 'api/models/caseFiles/caseFiles'
import { ROUTES } from 'parameters'
import { useNavbarItemsStore } from '@/store/navbar'

interface Props {
	caseFiles: CaseFiles
}

export const CaseFilesDetails = ({ caseFiles }: Props) => {
	const t = useTranslations()
	const { navbarIsLoading } = useNavbarItemsStore()
	useNavbarItems({
		title: caseFiles?.customId,
		backLabel: 'CaseFiles.back',
		actionButton: <EditButton buttonLabel="CaseFiles.edit" buttonLink={ROUTES.EDIT_CASE_FILES + caseFiles?.caseId} />
	})

	return (
		<Box width="100%">
			<DetailsWrapper>
				<Stack gap={4}>
					<Label>{t('CaseFiles.customId')}</Label>
					<Text fontSize="small" color="neutral.800">
						{caseFiles?.customId}
					</Text>
				</Stack>
				<Stack gap={4}>
					<Label>{t('General.status')}</Label>
					<Text fontSize="small" color="neutral.800">
						{caseFiles.status}
					</Text>
				</Stack>
				<Stack gap={4}>
					<Label>{t('General.barnahus')}</Label>
					<Text fontSize="small" color="neutral.800">
						{t('General.barnahusPlaceholder')}
					</Text>
				</Stack>
			</DetailsWrapper>
			{!navbarIsLoading && (
				<Box paddingX={10} width="100%">
					<Box
						padding={6}
						style={{ maxWidth: '60rem' }}
						backgroundColor="neutral.50"
						border="thin"
						borderColor="neutral.300">
						<Stack gap={4}>
							<Inline gap={4} alignItems="center">
								<Label>{t('CaseFiles.journeySnapshot')}</Label>
								<InputInfo infoText="Barnahuses.assignedMasterAdminInfoText" />
							</Inline>
							<Text fontSize="small" color="neutral.800">
								{t('CaseFiles.journeySnapshotPlaceholder')}
							</Text>
						</Stack>
					</Box>
				</Box>
			)}
		</Box>
	)
}
