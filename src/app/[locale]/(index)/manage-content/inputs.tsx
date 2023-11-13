'use client'
import { AddButton } from '@/components/custom/add-button'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { useTranslations } from 'next-intl'
import { ROUTES } from 'parameters'

export const Inputs = () => {
	const t = useTranslations()

	return (
		<Inline justifyContent="space-between" alignItems="center">
			<Box style={{ width: '600px' }}>
				<Text fontSize="small" lineHeight="large" color="neutral.800">
					{t('ManageContent.description')}
				</Text>
			</Box>
			<AddButton buttonLabel={t('ManageContent.add')} buttonLink={ROUTES.ADD_BARNAHUS} />
		</Inline>
	)
}
