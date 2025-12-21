'use client'

import { useTranslations } from 'next-intl'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { NumericInput } from '@/components/inputs/numeric-input'
import { TextInput } from '@/components/inputs/text-input'
import { OpenedProps } from '@/hooks/use-toggle'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { SearchDropdown } from '@/components/custom/search-dropdown'

interface Props {
	cancelDialog?: OpenedProps
}

const AdditionalCostsForm = ({ cancelDialog }: Props) => {
	const t = useTranslations()

	const billingTypeOptions = Object.values(BillingTypeEnum).map(value => ({
		id: value,
		name: t(`AdditionalCosts.${value}`)
	}))

	const methodOfPaymentOptions = Object.values(MethodOfPayment).map(value => ({
		id: value,
		name: `AdditionalCosts.${value}`
	}))

	const acquisitionTypeOptions = Object.values(AcquisitionTypeEnum).map(value => ({
		id: value,
		name: `AdditionalCosts.${value}`
	}))

	return (
		<FormItems openCancelDialog={cancelDialog?.toggleOpened}>
			<FormControl name="name">
				<FormControl.Label>
					<RequiredLabel>{t('General.name')}</RequiredLabel>
				</FormControl.Label>
				<TextInput placeholder={t('AdditionalCosts.namePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="acquisitionType">
				<FormControl.Label>
					<RequiredLabel>{t('AdditionalCosts.acquisitionType')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown
					options={acquisitionTypeOptions}
					placeholder={t('AdditionalCosts.acquisitionTypePlaceholder')}
				/>
				<FormControl.Message />
			</FormControl>
			<FormControl name="billingType">
				<FormControl.Label>
					<RequiredLabel>{t('AdditionalCosts.billingType')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown options={billingTypeOptions} placeholder={t('AdditionalCosts.billingTypePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<FormControl name="methodOfPayment">
				<FormControl.Label>
					<RequiredLabel>{t('AdditionalCosts.methodOfPayment')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown
					options={methodOfPaymentOptions}
					placeholder={t('AdditionalCosts.methodOfPaymentPlaceholder')}
				/>
				<FormControl.Message />
			</FormControl>
			<FormControl name="price">
				<FormControl.Label>
					<RequiredLabel>{t('General.price')}</RequiredLabel>
				</FormControl.Label>
				<NumericInput placeholder={t('General.pricePlaceholder')} decimalScale={2} />
				<FormControl.Message />
			</FormControl>
		</FormItems>
	)
}

export default AdditionalCostsForm
