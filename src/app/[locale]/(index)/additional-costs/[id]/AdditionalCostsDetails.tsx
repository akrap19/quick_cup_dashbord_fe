'use client'

import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { ROUTES } from 'parameters'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { ProductStateStatusEnum } from 'enums/productStateStatusEnum'

interface Props {
	additionalCost: AdditionalCosts
}

export const AdditionalCostsDetails = ({ additionalCost }: Props) => {
	const t = useTranslations()
	useNavbarItems({
		title: additionalCost.name,
		backLabel: 'AdditionalCosts.back',
		actionButton: (
			<EditButton buttonLabel="AdditionalCosts.edit" buttonLink={ROUTES.EDIT_ADDITIONAL_COSTS + additionalCost?.id} />
		)
	})

	const getAdditionalCostsLabel = (value: BillingTypeEnum | MethodOfPayment | AcquisitionTypeEnum) => {
		return t(`AdditionalCosts.${value}`)
	}

	const getProductStateStatusLabel = (value: ProductStateStatusEnum) => {
		return t(`Product.${value}`)
	}

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.name')}</Label>
				<Text fontSize="small" color="neutral.800">
					{additionalCost.name}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('AdditionalCosts.acquisitionType')}</Label>
				<Text fontSize="small" color="neutral.800">
					{additionalCost.acquisitionType ? getAdditionalCostsLabel(additionalCost.acquisitionType) : '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('AdditionalCosts.billingType')}</Label>
				<Text fontSize="small" color="neutral.800">
					{additionalCost.billingType ? getAdditionalCostsLabel(additionalCost.billingType) : '-'}
				</Text>
			</Stack>
			{additionalCost.billingType === BillingTypeEnum.BY_PIECE && (
				<Stack gap={4}>
					<Label>{t('AdditionalCosts.maxPieces')}</Label>
					<Text fontSize="small" color="neutral.800">
						{additionalCost.maxPieces !== null && additionalCost.maxPieces !== undefined
							? additionalCost.maxPieces
							: '-'}
					</Text>
				</Stack>
			)}
			<Stack gap={4}>
				<Label>{t('AdditionalCosts.methodOfPayment')}</Label>
				<Text fontSize="small" color="neutral.800">
					{additionalCost.methodOfPayment ? getAdditionalCostsLabel(additionalCost.methodOfPayment) : '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('AdditionalCosts.finalProductCalculationStatus')}</Label>
				<Text fontSize="small" color="neutral.800">
					{additionalCost.calculationStatus ? getProductStateStatusLabel(additionalCost.calculationStatus) : '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('AdditionalCosts.enableUpload')}</Label>
				<Text fontSize="small" color="neutral.800">
					{additionalCost.enableUpload ? t('General.yes') : t('General.no')}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.price')}</Label>
				<Text fontSize="small" color="neutral.800">
					{additionalCost.price !== null && additionalCost.price !== undefined
						? `${additionalCost.price.toFixed(2)}€`
						: '-'}
				</Text>
			</Stack>
		</DetailsWrapper>
	)
}
