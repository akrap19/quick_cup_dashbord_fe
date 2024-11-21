'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { CaseFiles } from 'api/models/caseFiles/caseFiles'
import { ROUTES } from 'parameters'

interface Props {
	caseFiles: CaseFiles
}

export const CaseFilesDetails = ({ caseFiles }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: caseFiles?.customId,
		backLabel: 'CaseFiles.back',
		// eslint-disable-next-line
		actionButton: <EditButton buttonLabel="CaseFiles.edit" buttonLink={ROUTES.EDIT_CASE_FILES + caseFiles?.caseId} />
	})

	return (
		<Box width="100%">
			<DetailsWrapper>
				<Stack gap={4}>
					<Label>{t('CaseFiles.customId')}</Label>
					<Text fontSize="small" color="neutral.800">
						{caseFiles?.customId ?? t('CaseFiles.customId') + t('General.notDefined')}
					</Text>
				</Stack>
				<Stack gap={4}>
					<Label>{t('General.barnahus')}</Label>
					<Text fontSize="small" color="neutral.800">
						{caseFiles?.barnahusLocation ?? t('General.barnahus') + t('General.notDefined')}
					</Text>
				</Stack>
				<Stack gap={4}>
					<Label>{t('General.notes')}</Label>
					<Text fontSize="small" color="neutral.800">
						{caseFiles?.canAddNotes.toString()}
					</Text>
				</Stack>
			</DetailsWrapper>
			{/* {!navbarIsLoading && (
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
			)} */}
		</Box>
	)
}
