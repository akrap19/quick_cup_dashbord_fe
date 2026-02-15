'use client'

import { useTranslations } from 'next-intl'
import { useWatch, useFormContext } from 'react-hook-form'
import { useState, useEffect } from 'react'

import { FormItems } from '@/components/custom/layouts/add-form'
import { FormControl } from '@/components/inputs/form-control'
import { RequiredLabel } from '@/components/inputs/required-label'
import { NumericInput } from '@/components/inputs/numeric-input'
import { TextInput } from '@/components/inputs/text-input'
import { Checkbox } from '@/components/inputs/checkbox'
import { OpenedProps } from '@/hooks/use-toggle'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { ProductStateStatusEnum } from 'enums/productStateStatusEnum'
import { AdditionalCostCalculationTypeEnum } from 'enums/additionalCostCalculationTypeEnum'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { Inline } from '@/components/layout/inline'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Label } from '@/components/inputs/label'

interface Props {
	cancelDialog?: OpenedProps
}

const AdditionalCostsForm = ({ cancelDialog }: Props) => {
	const t = useTranslations()
	const form = useFormContext()

	const calculationStatus = useWatch({ control: form.control, name: 'calculationStatus' })
	const calculationType = useWatch({ control: form.control, name: 'calculationType' })
	const [isCalculationEnabled, setIsCalculationEnabled] = useState(
		calculationStatus !== undefined && calculationStatus !== null
	)

	// Sync checkbox state with calculationStatus value
	useEffect(() => {
		if (calculationStatus !== undefined && calculationStatus !== null) {
			setIsCalculationEnabled(true)
		} else if (!isCalculationEnabled) {
			// Keep state if checkbox is explicitly unchecked
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calculationStatus])

	// Clear maxPieces when billingType changes from BY_PIECE to something else or when calculationType is cleared
	useEffect(() => {
		if (!calculationType) {
			form.setValue('maxPieces', null, { shouldValidate: false, shouldDirty: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calculationType])

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

	const productStateStatusOptions = Object.values(ProductStateStatusEnum).map(value => ({
		id: value,
		name: `Product.${value}`
	}))

	const calculationTypeOptions = Object.values(AdditionalCostCalculationTypeEnum).map(value => ({
		id: value,
		name: t(`AdditionalCosts.${value}`)
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
			<FormControl name="billingType">
				<FormControl.Label>
					<RequiredLabel>{t('AdditionalCosts.billingType')}</RequiredLabel>
				</FormControl.Label>
				<SearchDropdown options={billingTypeOptions} placeholder={t('AdditionalCosts.billingTypePlaceholder')} />
				<FormControl.Message />
			</FormControl>
			<Inline gap={3} alignItems="flex-start">
				<Box style={{ flex: 1 }}>
					<FormControl name="calculationType">
						<FormControl.Label>
							<Label>{t('AdditionalCosts.calculationType')}</Label>
						</FormControl.Label>
						<SearchDropdown
							options={calculationTypeOptions}
							placeholder={t('AdditionalCosts.calculationTypePlaceholder')}
						/>
						<FormControl.Message />
					</FormControl>
				</Box>
				{calculationType && (
					<Box style={{ flex: 1 }}>
						<FormControl name="maxPieces">
							<FormControl.Label>
								<Label>{t('AdditionalCosts.maxPieces')}</Label>
							</FormControl.Label>
							<NumericInput placeholder={t('AdditionalCosts.maxPiecesPlaceholder')} decimalScale={0} />
							<FormControl.Message />
						</FormControl>
					</Box>
				)}
			</Inline>
			<Box position="relative">
				<Stack gap={1}>
					<Label>{t('AdditionalCosts.includeInFinalProductCalculation')}</Label>
					<Inline alignItems="center" gap={3}>
						<Checkbox
							checked={isCalculationEnabled}
							onChange={e => {
								setIsCalculationEnabled(e.target.checked)
								if (!e.target.checked) {
									form.setValue('calculationStatus', null, { shouldValidate: false })
								}
							}}
						/>
						<Box style={{ flex: 1 }}>
							<FormControl name="calculationStatus">
								<SearchDropdown
									options={productStateStatusOptions}
									placeholder={t('AdditionalCosts.finalProductCalculationStatusPlaceholder')}
									disabled={!isCalculationEnabled}
								/>
								<FormControl.Message />
							</FormControl>
						</Box>
					</Inline>
				</Stack>
			</Box>
			<FormControl name="price">
				<FormControl.Label>
					<Label>{t('General.price')}</Label>
				</FormControl.Label>
				<NumericInput placeholder={t('General.pricePlaceholder')} decimalScale={2} />
				<FormControl.Message />
			</FormControl>
			<Box position="relative">
				<Stack gap={1} alignItems="flex-start">
					<Label>{t('AdditionalCosts.enableUpload')}</Label>
					<Checkbox
						checked={form.watch('enableUpload') || false}
						onChange={e => {
							form.setValue('enableUpload', e.target.checked, { shouldValidate: true })
						}}
					/>
					<FormControl.Message />
				</Stack>
			</Box>
		</FormItems>
	)
}

export default AdditionalCostsForm
