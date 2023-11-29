import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'

interface Props {
	children: ReactNode[]
}

export const CaseJourneyHeader = ({ children }: Props) => {
	const t = useTranslations()

	return (
		<Box padding={6} paddingBottom={8}>
			<Inline gap={1}>
				<Text color="neutral.800" fontSize="small">
					{`${t('General.caseId')}:`}
				</Text>
				<Text color="neutral.800" fontSize="small" fontWeight="bold">
					{children[0]}
				</Text>
			</Inline>
			<Box display="flex" justify="center" width="100%">
				<Stack gap={6}>
					<Text color="neutral.800" fontSize="xbig" fontWeight="semibold" textAlign="center">
						{t(children[1])}
					</Text>
					<Box
						style={{
							maxWidth: '26rem'
						}}>
						<Text color="neutral.800" fontSize="small" textAlign="center">
							{t(children[2])}
						</Text>
					</Box>
				</Stack>
			</Box>
		</Box>
	)
}
