'use client'

import { useTranslations } from 'next-intl'
import { useFormContext, useWatch, Controller } from 'react-hook-form'
import { useEffect, useMemo, useRef } from 'react'
import { NumericInput } from '@/components/inputs/numeric-input'
import { Button } from '@/components/inputs/button'
import { PlainPlusIcon } from '@/components/icons/plain-plus-icon'
import { MinusIcon } from '@/components/icons/minus-icon'
import { Text } from '@/components/typography/text'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'
import { AdditionalCosts } from 'api/models/additional-costs/additionalCosts'
import { BillingTypeEnum } from 'enums/billingTypeEnum'
import { OrderStatusEnum } from 'enums/orderStatusEnum'
import { MethodOfPayment } from 'enums/methodOfPaymentEnum'
import { Product } from 'api/models/products/product'
import { Order } from 'api/models/order/order'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { FormControl } from '@/components/inputs/form-control'
import { FileUpload } from '@/components/custom/upload/file-upload/FileUpload'
import { getFileUrl } from '@/utils/downloadFile'

interface AdditionalCostListItemProps {
	additionalCost: AdditionalCosts
	index: number
	isEditMode?: boolean
	orderStatus?: string
	order?: Order
	products?: Product[]
	acquisitionType?: AcquisitionTypeEnum
}

export const AdditionalCostListItem = ({
	additionalCost,
	index,
	isEditMode = false,
	orderStatus,
	order,
	products = [],
	acquisitionType
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
	const previousProductQuantitiesSumRef = useRef<number>(0)
	const isByPiece = additionalCost.billingType === BillingTypeEnum.BY_PIECE
	const isBeforePayment = additionalCost.methodOfPayment === MethodOfPayment.BEFORE
	const isAfterPayment = additionalCost.methodOfPayment === MethodOfPayment.AFTER

	const isCreateMode = !isEditMode
	const isReadOnlyInCreate = isCreateMode && !isBeforePayment

	// Show product quantity fields for "after" payment method in edit mode
	const showProductQuantityFields =
		isEditMode && isAfterPayment && isIncluded && order && order.status !== OrderStatusEnum.PENDING

	// Show quantity input for "by piece" billing type when not showing product quantities
	const showQuantityInput = isByPiece && isIncluded && !showProductQuantityFields

	// Show file upload when enableUpload is true and additional cost is included
	const showFileUpload = additionalCost.enableUpload && isIncluded

	// Get products that should show file upload (products with quantity > 0)
	const productsToShowFileUpload = useMemo(() => {
		if (!showFileUpload) return []
		if (showProductQuantityFields) {
			// In edit mode with product quantities, show for products with quantity > 0
			return products.filter(product => (productQuantities[product.id] || 0) > 0)
		}
		// In create mode, show for all products (they are already selected in step 1)
		// We show file upload for all products in the list
		return products
	}, [showFileUpload, showProductQuantityFields, products, productQuantities])

	// Get form products
	const formProducts = useWatch({ control: form.control, name: 'products' }) || []

	// Initialize productQuantities for "after" payment method
	useEffect(() => {
		if (showProductQuantityFields && products.length > 0) {
			const currentProductQuantities = form.getValues(productQuantitiesFieldName)
			if (!currentProductQuantities || Object.keys(currentProductQuantities).length === 0) {
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
	}, [showProductQuantityFields, products.length])

	useEffect(() => {
		const currentAdditionalCostId = form.getValues(additionalCostIdFieldName)
		if (!currentAdditionalCostId) {
			form.setValue(additionalCostIdFieldName, additionalCost.id, { shouldValidate: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Update quantity from productQuantities when productQuantities change
	useEffect(() => {
		if (!isIncluded || !isByPiece || !showProductQuantityFields) {
			return
		}

		if (productQuantities && Object.keys(productQuantities).length > 0) {
			const productQuantitiesValues = Object.values(productQuantities) as number[]
			const productQuantitiesSum = productQuantitiesValues.reduce((sum, qty) => sum + (Number(qty) || 0), 0)

			// Only update if the sum actually changed
			if (productQuantitiesSum !== previousProductQuantitiesSumRef.current) {
				previousProductQuantitiesSumRef.current = productQuantitiesSum
				const currentQuantity = form.getValues(quantityFieldName)
				if (currentQuantity !== productQuantitiesSum) {
					form.setValue(quantityFieldName, productQuantitiesSum, { shouldValidate: false, shouldDirty: false })
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isIncluded, isByPiece, showProductQuantityFields, productQuantities])

	// Update quantity for one_time billing
	useEffect(() => {
		if (!isIncluded) {
			if (!isByPiece) {
				const currentQuantity = form.getValues(quantityFieldName)
				if (currentQuantity !== 0) {
					form.setValue(quantityFieldName, 0, { shouldValidate: false, shouldDirty: false })
				}
			}
			previousProductQuantitiesSumRef.current = 0
			return
		}

		if (!isByPiece) {
			// For one_time billing, quantity should be 1
			const currentQuantity = form.getValues(quantityFieldName)
			if (currentQuantity !== 1) {
				form.setValue(quantityFieldName, 1, { shouldValidate: false, shouldDirty: false })
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isIncluded, isByPiece])

	useEffect(() => {
		if (!isIncluded && isByPiece) {
			form.setValue(quantityFieldName, 0, { shouldValidate: false, shouldDirty: false })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isIncluded, isByPiece])

	const showButton = isAfterPayment ? (isEditMode ? orderStatus !== OrderStatusEnum.PENDING : false) : true
	const buttonEnabled = isAfterPayment || (isBeforePayment && !isReadOnlyInCreate)

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
								{showQuantityInput && (
									<Inline alignItems="center" justifyContent="center" gap={2}>
										<Text color="neutral.700">{'- ' + t('General.quantity')}</Text>
										<Box style={{ width: '140px' }}>
											<FormControl name={quantityFieldName as any}>
												<NumericInput
													placeholder={t('General.quantityPlaceholder')}
													allowNegative={false}
													decimalScale={0}
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
				{showProductQuantityFields && products.length > 0 && (
					<Box paddingLeft={showButton ? 5 : 0}>
						<Stack gap={2}>
							{products.map(product => {
								return (
									<Stack key={product.id} gap={2}>
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
															onValueChange={values => {
																field.onChange(values.floatValue || 0)
															}}
														/>
													)}
												/>
											</Box>
										</Inline>
										{showFileUpload && ((productQuantities[product.id] || 0) > 0 || productFileIds[product.id]) && (
											<Box paddingLeft={3}>
												<Stack gap={1}>
													<Text color="neutral.700" fontSize="small">
														{t('General.uploadFile')}:
													</Text>
													<Controller
														defaultValue={productFileIds[product.id] || ''}
														name={`${productFileIdsFieldName}.${product.id}` as any}
														control={form.control}
														render={({ field }) => {
															const fileId = field.value || productFileIds[product.id] || ''
															// Get file info from store (includes blob URL for preview)
															const fileInfo = productFileInfos[product.id]
															// Use stored file info if available, otherwise construct URL from fileId
															const fileUrl = fileInfo?.url || (fileId ? getFileUrl(fileId) : undefined)
															// Only create initialFile if we have both fileId and fileUrl
															const initialFile =
																fileId && fileUrl ? { id: fileId, name: fileInfo?.name, url: fileUrl } : undefined
															return (
																<FileUpload
																	id={`additional-cost-${additionalCost.id}-product-${product.id}-file`}
																	value={fileId}
																	onChange={field.onChange}
																	onFileChangeFull={fileInfo => {
																		field.onChange(fileInfo?.id || '')
																		// Store file info for preview persistence
																		if (fileInfo) {
																			form.setValue(`${productFileInfosFieldName}.${product.id}` as any, fileInfo, {
																				shouldValidate: false
																			})
																		} else {
																			form.setValue(`${productFileInfosFieldName}.${product.id}` as any, undefined, {
																				shouldValidate: false
																			})
																		}
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
								)
							})}
						</Stack>
					</Box>
				)}
				{showFileUpload && !showProductQuantityFields && productsToShowFileUpload.length > 0 && (
					<Box paddingLeft={showButton ? 5 : 0}>
						<Stack gap={3}>
							{productsToShowFileUpload.map(product => {
								return (
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
												// Get file info from store (includes blob URL for preview)
												const fileInfo = productFileInfos[product.id]
												// Use stored file info if available, otherwise construct URL from fileId
												const fileUrl = fileInfo?.url || (fileId ? getFileUrl(fileId) : undefined)
												// Only create initialFile if we have both fileId and fileUrl
												const initialFile =
													fileId && fileUrl ? { id: fileId, name: fileInfo?.name, url: fileUrl } : undefined
												return (
													<FileUpload
														id={`additional-cost-${additionalCost.id}-product-${product.id}-file`}
														value={fileId}
														onChange={field.onChange}
														onFileChangeFull={fileInfo => {
															field.onChange(fileInfo?.id || '')
															// Store file info for preview persistence
															if (fileInfo) {
																form.setValue(`${productFileInfosFieldName}.${product.id}` as any, fileInfo, {
																	shouldValidate: false
																})
															} else {
																form.setValue(`${productFileInfosFieldName}.${product.id}` as any, undefined, {
																	shouldValidate: false
																})
															}
														}}
														initialFile={initialFile}
													/>
												)
											}}
										/>
									</Stack>
								)
							})}
						</Stack>
					</Box>
				)}
			</Stack>
		</Box>
	)
}
