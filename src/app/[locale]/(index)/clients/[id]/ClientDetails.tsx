'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { EditButton } from '@/components/custom/button/edit-button'
import { Button } from '@/components/inputs/button'
import { DetailsWrapper } from '@/components/custom/layouts/DetailsWrapper'
import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Text } from '@/components/typography/text'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { handleFullName } from '@/utils/handleFullName'
import { Client } from 'api/models/clients/client'
import { ROUTES } from 'parameters'
import { Badge } from '@/components/custom/badge/Badge'
import { Box } from '@/components/layout/box'
import { DataTable } from '@/components/data-display/data-table'
import { columns } from './columns'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'

interface Props {
	client: Client
}

export const ClientDetails = ({ client }: Props) => {
	const t = useTranslations()
	const [showPriceList, setShowPriceList] = useState(false)

	useNavbarItems({
		title: handleFullName(client.firstName, client.lastName),
		backLabel: 'Clients.back',
		actionButton: <EditButton buttonLabel="Clients.edit" buttonLink={ROUTES.EDIT_CLIENTS + client.userId} />
	})

	return (
		<DetailsWrapper>
			<Stack gap={4}>
				<Label>{t('General.companyName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.companyName ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.pin')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.pin ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.firstName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.firstName ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.lastName')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.lastName ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.email')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.email ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.phoneNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.phoneNumber ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.placeAndPostalCode')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.location ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.streetAndNumber')}</Label>
				<Text fontSize="small" color="neutral.800">
					{client.street ?? '-'}
				</Text>
			</Stack>
			<Stack gap={4}>
				<Label>{t('General.status')}</Label>
				<Text fontSize="small" color="neutral.800">
					<Badge variant={client.status as any} />
				</Text>
			</Stack>
			{client.productPrices && client.productPrices.length > 0 && (
				<Box style={{ gridColumn: 'span 2', width: '100%' }}>
					<Stack gap={6}>
						<div>
							<Button
								onClick={() => setShowPriceList(!showPriceList)}
								variant={showPriceList ? 'destructive' : 'success'}
								size="small">
								{showPriceList ? t('Clients.hideProductPriceList') : t('Clients.showProductPriceList')}
							</Button>
						</div>
						{showPriceList && (
							<>
								{client.productPrices.map(product => (
									<Box key={product.id} style={{ marginBottom: '16px' }}>
										<Stack gap={4} style={{ marginBottom: '16px' }}>
											<Label>{product.productName}</Label>
										</Stack>
										{product.prices && product.prices.length > 0 ? (
											<DataTable
												columns={columns}
												data={replaceNullInListWithDash(product.prices ?? [])}
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
