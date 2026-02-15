'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { NumericInput } from '@/components/inputs/numeric-input'
import { Button } from '@/components/inputs/button'
import { PlainPlusIcon } from '@/components/icons/plain-plus-icon'
import { MinusIcon } from '@/components/icons/minus-icon'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { OrderStatusEnum } from 'enums/orderStatusEnum'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'
import { Product } from 'api/models/products/product'
import { FormControl } from '@/components/inputs/form-control'
import { FileUpload } from '@/components/custom/upload/file-upload/FileUpload'
import { getFileUrl } from '@/utils/downloadFile'
import { AdditionalCostCalculationTypeEnum } from 'enums/additionalCostCalculationTypeEnum'

interface AdditionalCostListItemProps {
	additionalCost: AdditionalCosts
	index: number
	isEditMode?: boolean
	orderStatus?: string
	products?: Product[]
}

export const AdditionalCostListItem = ({
	additionalCost,
	index,
	isEditMode = false,
	orderStatus,
	products = []
}: AdditionalCostListItemProps) => {
	const t = useTranslations()
	const form = useFormContext()
	const isIncludedFieldName = `additionalCosts.${index}.isIncluded`
	const quantityFieldName = `additionalCosts.${index}.quantity`
	const additionalCostIdFieldName = `additionalCosts.${index}.additionalCostId`
	const productQuantitiesFieldName = `additionalCosts.${index}.productQuantities`
	const productFileIdsFieldName = `additionalCosts.${index}.productFileIds`
	const productFileInfosFieldName = `additionalCosts.${index}.productFileInfos`

	const isIncluded = useWatch({ control: form.control, name: isIncludedFieldName }) || false
	const productQuantities = useWatch({ control: form.control, name: productQuantitiesFieldName }) || {}
	const productFileIds = useWatch({ control: form.control, name: productFileIdsFieldName }) || {}
	const productFileInfos = useWatch({ control: form.control, name: productFileInfosFieldName }) || {}

	const calculationType = additionalCost.calculationType
	const isOverall = calculationType === AdditionalCostCalculationTypeEnum.OVERALL
	const isByProduct = calculationType === AdditionalCostCalculationTypeEnum.BY_PRODUCT

	const isBeforePayment = additionalCost.methodOfPayment === MethodOfPayment.BEFORE
	const isAfterPayment = additionalCost.methodOfPayment === MethodOfPayment.AFTER
	const showButton = isAfterPayment ? (isEditMode ? orderStatus !== OrderStatusEnum.PENDING : false) : true
	const isCreateMode = !isEditMode
	const isReadOnlyInCreate = isCreateMode && !isBeforePayment
	const buttonEnabled = isAfterPayment || (isBeforePayment && !isReadOnlyInCreate)
	const showFileUpload = additionalCost.enableUpload && isIncluded

	// Set additionalCostId on mount
	useEffect(() => {
		if (!form.getValues(additionalCostIdFieldName)) {
			form.setValue(additionalCostIdFieldName, additionalCost.id, { shouldValidate: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Initialize productQuantities for by_product calculation type
	useEffect(() => {
		if (isByProduct && isIncluded && products.length > 0) {
			const currentProductQuantities = form.getValues(productQuantitiesFieldName)
			if (!currentProductQuantities || Object.keys(currentProductQuantities).length === 0) {
				const formProducts = form.getValues('products') || []
				const initialQuantities: Record<string, number> = {}
				products.forEach(product => {
					const formProduct = formProducts.find((p: any) => p.productId === product.id)
					initialQuantities[product.id] = formProduct?.quantity || 0
				})
				if (Object.keys(initialQuantities).length > 0) {
					form.setValue(productQuantitiesFieldName, initialQuantities, { shouldValidate: false, shouldDirty: false })
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isByProduct, isIncluded, products.length])

	const getMaxPiecesValidation = () => {
		if (additionalCost.maxPieces !== undefined && additionalCost.maxPieces !== null) {
			return (values: any) => (values.floatValue || 0) <= additionalCost.maxPieces!
		}
		return undefined
	}

	return (
		<Box paddingY={3} paddingX={0} style={{ borderBottom: '1px solid #E5E7EB' }}>
			<Stack gap={2}>
				<Inline justifyContent="space-between" alignItems="center" gap={3}>
					<Box display="flex" style={{ flex: 1 }}>
						<Inline justifyContent="flex-start" alignItems="center" gap={3}>
							{showButton && (
								<Button
									variant={isIncluded ? 'destructive' : 'success'}
									size="icon"
									disabled={!buttonEnabled}
									onClick={e => {
										e.preventDefault()
										e.stopPropagation()
										if (buttonEnabled) {
											form.setValue(isIncludedFieldName, !isIncluded, { shouldValidate: true })
										}
									}}
									type="button">
									{isIncluded ? (
										<MinusIcon size="small" color="shades.00" />
									) : (
										<PlainPlusIcon size="small" color="shades.00" />
									)}
								</Button>
							)}
							<Inline alignItems="center" justifyContent="center" gap={1}>
								<Text fontSize="medium" color="neutral.900" fontWeight="semibold">
									{additionalCost.name}
								</Text>
								{isOverall && isIncluded && !showFileUpload && (
									<Inline alignItems="center" justifyContent="center" gap={2}>
										<Text color="neutral.700">{' - ' + t('General.quantity') + ':'}</Text>
										<Box style={{ width: '140px' }}>
											<FormControl name={quantityFieldName as any}>
												<NumericInput
													placeholder={t('General.quantityPlaceholder')}
													allowNegative={false}
													decimalScale={0}
													isAllowed={getMaxPiecesValidation()}
												/>
											</FormControl>
										</Box>
										{additionalCost.maxPieces !== undefined && additionalCost.maxPieces !== null && (
											<Text color="neutral.600" fontSize="small">
												({t('AdditionalCosts.maxPieces')}: {additionalCost.maxPieces})
											</Text>
										)}
									</Inline>
								)}
							</Inline>
						</Inline>
					</Box>
				</Inline>
				{isByProduct && isIncluded && products.length > 0 && (
					<Box paddingLeft={showButton ? 5 : 0}>
						<Stack gap={2}>
							{products.map(product => (
								<Stack key={product.id} gap={2}>
									{!showFileUpload && (
										<Inline alignItems="center" gap={2}>
											<Text color="neutral.700" fontSize="small" style={{ minWidth: '120px' }}>
												{product.name}:
											</Text>
											<Box style={{ width: '140px' }}>
												<Controller
													defaultValue={productQuantities[product.id] || 0}
													name={`${productQuantitiesFieldName}.${product.id}` as any}
													control={form.control}
													render={({ field }) => (
														<NumericInput
															placeholder={t('General.quantityPlaceholder')}
															allowNegative={false}
															decimalScale={0}
															value={field.value || 0}
															isAllowed={getMaxPiecesValidation()}
															onValueChange={values => field.onChange(values.floatValue || 0)}
														/>
													)}
												/>
											</Box>
										</Inline>
									)}
									{showFileUpload && (
										<Box paddingLeft={!showFileUpload ? 3 : 0}>
											<Stack gap={1}>
												<Text color="neutral.700" fontSize="small" fontWeight="semibold">
													{product.name}:
												</Text>
												<Controller
													defaultValue={productFileIds[product.id] || ''}
													name={`${productFileIdsFieldName}.${product.id}` as any}
													control={form.control}
													render={({ field }) => {
														const fileId = field.value || productFileIds[product.id] || ''
														const fileInfo = productFileInfos[product.id]
														const fileUrl = fileInfo?.url || (fileId ? getFileUrl(fileId) : undefined)
														const initialFile =
															fileId && fileUrl ? { id: fileId, name: fileInfo?.name, url: fileUrl } : undefined
														return (
															<FileUpload
																id={`additional-cost-${additionalCost.id}-product-${product.id}-file`}
																value={fileId}
																onChange={field.onChange}
																onFileChangeFull={fileInfo => {
																	field.onChange(fileInfo?.id || '')
																	form.setValue(
																		`${productFileInfosFieldName}.${product.id}` as any,
																		fileInfo || undefined,
																		{ shouldValidate: false }
																	)
																}}
																initialFile={initialFile}
															/>
														)
													}}
												/>
											</Stack>
										</Box>
									)}
								</Stack>
							))}
						</Stack>
					</Box>
				)}
				{showFileUpload && !isByProduct && products.length > 0 && (
					<Box paddingLeft={showButton ? 5 : 0}>
						<Stack gap={3}>
							{products.map(product => (
								<Stack key={product.id} gap={1}>
									<Text color="neutral.700" fontSize="small" fontWeight="semibold">
										{product.name}:
									</Text>
									<Controller
										defaultValue={productFileIds[product.id] || ''}
										name={`${productFileIdsFieldName}.${product.id}` as any}
										control={form.control}
										render={({ field }) => {
											const fileId = field.value || productFileIds[product.id] || ''
											const fileInfo = productFileInfos[product.id]
											const fileUrl = fileInfo?.url || (fileId ? getFileUrl(fileId) : undefined)
											const initialFile =
												fileId && fileUrl ? { id: fileId, name: fileInfo?.name, url: fileUrl } : undefined
											return (
												<FileUpload
													id={`additional-cost-${additionalCost.id}-product-${product.id}-file`}
													value={fileId}
													onChange={field.onChange}
													onFileChangeFull={fileInfo => {
														field.onChange(fileInfo?.id || '')
														form.setValue(`${productFileInfosFieldName}.${product.id}` as any, fileInfo || undefined, {
															shouldValidate: false
														})
													}}
													initialFile={initialFile}
												/>
											)
										}}
									/>
								</Stack>
							))}
						</Stack>
					</Box>
				)}
			</Stack>
		</Box>
	)
}
