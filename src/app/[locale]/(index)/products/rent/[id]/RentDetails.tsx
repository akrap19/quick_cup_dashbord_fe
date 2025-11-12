'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { Product } from 'api/models/products/product'
import { ROUTES } from 'parameters'

interface Props {
	product: Product
}

export const RentDetails = ({ product }: Props) => {
	const t = useTranslations()
	const title = product?.name ?? t('General.name') + t('General.notDefined')

	useNavbarItems({
		title,
		backLabel: 'Rent.back',
		actionButton: <EditButton buttonLabel="Rent.edit" buttonLink={ROUTES.EDIT_RENT + product?.id} />
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.name')}</Label>
				<Text fontSize="small" color="neutral.800">
					{product?.name ?? t('General.name') + t('General.notDefined')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.description')}</Label>
				<Text fontSize="small" color="neutral.800">
					{product?.description ?? t('General.description') + t('General.notDefined')}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
