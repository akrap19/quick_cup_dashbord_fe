'use client'

import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Content } from 'api/models/content/content'
import { MobilePreview } from '@/components/custom/mobile-preview'
import { Box } from '@/components/layout/box'

interface Props {
	caseJourneyName: string
	content: Content
}

export const CaseJourneyDetails = ({ caseJourneyName, content }: Props) => {
	useNavbarItems({
		title: caseJourneyName,
		backLabel: 'CaseJourney.back'
	})

	return (
		<Box paddingX={10} paddingTop={10} paddingBottom={8}>
			<Box
				paddingY={12}
				backgroundColor="neutral.50"
				border="thin"
				borderColor="neutral.300"
				style={{ minWidth: '45rem' }}>
				<MobilePreview content={content} />
			</Box>
		</Box>
	)
}
