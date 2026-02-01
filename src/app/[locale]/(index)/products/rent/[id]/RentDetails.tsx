'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { ROUTES } from 'parameters'
import { Product } from 'api/models/products/product'
import { ItemCarousel } from '@/components/custom/item-carousel/ItemCarousel'
import Image from 'next/image'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { DataTable } from '@/components/data-display/data-table'
import { columns } from './columns'
import { servicePriceColumns } from './servicePriceColumns'
import { getProductStateColumns } from './productStateColumns'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { Button } from '@/components/inputs/button'
import { useHasRoleAccess } from '@/hooks/use-has-role-access'
import { UserRoleEnum } from 'enums/userRoleEnum'

interface Props {
	product: Product
}

export const RentDetails = ({ product }: Props) => {
	const t = useTranslations()
	const [showServicePriceList, setShowServicePriceList] = useState(false)
	const title = product?.name ?? '-'
	const isClient = useHasRoleAccess([UserRoleEnum.CLIENT])

	useNavbarItems({
		title,
		backLabel: 'Rent.back',
		actionButton: useHasRoleAccess([UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN]) && (
			<EditButton buttonLabel="Rent.edit" buttonLink={ROUTES.EDIT_RENT + product?.id} />
		)
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.name')}</Label>
				<Text fontSize="small" color="neutral.800">
					{product?.name ?? '-'}
				</Text>
			</Stack>
			<div />
			<Stack gap={4}>
				<Label>{t('General.unit')}</Label>
				<Text fontSize="small" color="neutral.800">
					{product?.unit ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.quantityPerUnit')}</Label>
				<Text fontSize="small" color="neutral.800">
					{product?.quantityPerUnit ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.transportationUnit')}</Label>
				<Text fontSize="small" color="neutral.800">
					{product?.transportationUnit ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.unitsPerTransportationUnit')}</Label>
				<Text fontSize="small" color="neutral.800">
					{product?.unitsPerTransportationUnit ?? '-'}
				</Text>
			</Stack>
			{product?.images && product?.images.length > 0 && (
				<Stack gap={4}>
					<Label>{t('General.images')}</Label>
					<Inline justifyContent="center" alignItems="center">
						<Box style={{ width: '242px', height: '300px' }}>
							<ItemCarousel>
								{product?.images?.map((item: any) => (
									<Image
										key={item}
										alt="quick cup image"
										src={item?.url}
										width={242}
										height={300}
										style={{ objectFit: 'contain' }}
										priority
									/>
								))}
							</ItemCarousel>
						</Box>
					</Inline>
				</Stack>
			)}
			<Stack gap={4}>
				<Label>{t('General.description')}</Label>
				<Text
					fontSize="small"
					color="neutral.800"
					dangerouslySetInnerHTML={{
						__html: product?.description ?? '-'
					}}
				/>
			</Stack>
			{!isClient && product?.prices && product?.prices.length > 0 && (
				<Box style={{ gridColumn: 'span 2' }}>
					<DataTable
						columns={columns}
						data={replaceNullInListWithDash(product?.prices ?? [])}
						enableCheckboxes={false}
						enableRowClick={false}
						equalColumnWidths={true}
					/>
				</Box>
			)}
			{product?.productStates && product?.productStates.length > 0 && (
				<Box style={{ gridColumn: 'span 2' }}>
					<Stack gap={4}>
						<Label>{t('Product.productStates')}</Label>
						<DataTable
							columns={getProductStateColumns(t)}
							data={replaceNullInListWithDash(product.productStates ?? [])}
							enableCheckboxes={false}
							enableRowClick={false}
							equalColumnWidths={true}
						/>
					</Stack>
				</Box>
			)}
			{!isClient && product.servicePrices && product.servicePrices.length > 0 && (
				<Box style={{ gridColumn: 'span 2', width: '100%' }}>
					<Stack gap={6}>
						<div>
							<Button
								onClick={() => setShowServicePriceList(!showServicePriceList)}
								variant={showServicePriceList ? 'destructive' : 'success'}
								size="small">
								{showServicePriceList ? t('Rent.hideServicePriceList') : t('Rent.showServicePriceList')}
							</Button>
						</div>
						{showServicePriceList && (
							<>
								{product.servicePrices.map(service => (
									<Box key={service.serviceId} style={{ marginBottom: '16px' }}>
										<Stack gap={4} style={{ marginBottom: '16px' }}>
											<Label>{service.serviceName}</Label>
										</Stack>
										{service.prices && service.prices.length > 0 ? (
											<DataTable
												columns={servicePriceColumns}
												data={replaceNullInListWithDash(service.prices ?? [])}
												enableCheckboxes={false}
												enableRowClick={false}
												equalColumnWidths={true}
											/>
										) : (
											<Text fontSize="small" color="neutral.800">
												{t('General.noPrices') || 'No prices available'}
											</Text>
										)}
									</Box>
								))}
							</>
						)}
					</Stack>
				</Box>
			)}
		</DetailsWrapper>
	)
}
