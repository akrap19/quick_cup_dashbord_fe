import { Label } from '@/components/inputs/label'
import { Stack } from '@/components/layout/stack'
import { Service } from 'api/models/services/service'
import { Text } from '@/components/typography/text'
import { useTranslations } from 'next-intl'
import { Box } from '@/components/layout/box'
import { DataTable } from '@/components/data-display/data-table'
import { priceColumns } from './priceColumns'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { tokens } from '@/style/theme.css'
import { formatUnitLabel } from '@/utils/index'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { BillingIntervalEnum } from 'enums/billingIntervalEnum'
import { InputTypeEnum } from 'enums/inputTypeEnum'
import { emptyToDash } from '@/utils/emptyToDash'
import { Heading } from '@/components/typography/heading'

interface Props {
	service: Service
}

export const ServiceDetails = ({ service }: Props) => {
	const t = useTranslations()

	const getServiceLabel = (value: AcquisitionTypeEnum | BillingIntervalEnum | InputTypeEnum) => {
		return t(`Services.${value}`)
	}

	const acquisitionType = service?.acquisitionType as AcquisitionTypeEnum | 'both' | undefined

	return (
		<Box paddingTop={6} paddingBottom={8} width="100%">
			<Box
				padding={6}
				style={{ maxWidth: '60rem' }}
				backgroundColor="shades.00"
				border="thin"
				borderColor="neutral.300">
				<Stack gap={8}>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',
							columnGap: tokens.spacing[6],
							rowGap: tokens.spacing[8]
						}}>
						<Stack gap={4}>
							<Label>{t('General.name')}</Label>
							<Text fontSize="small" color="neutral.800">
								{service?.name ?? '-'}
							</Text>
						</Stack>
						<Stack gap={4}>
							<Label>{t('Services.priceCalculationUnit')}</Label>
							<Text fontSize="small" color="neutral.800">
								{formatUnitLabel(service?.priceCalculationUnit) ?? '-'}
							</Text>
						</Stack>
						<Stack gap={4}>
							<Label>{t('Services.acquisitionType')}</Label>
							<Text fontSize="small" color="neutral.800">
								{service?.acquisitionType ? getServiceLabel(service.acquisitionType) : '-'}
							</Text>
						</Stack>
						<Stack gap={4}>
							<Label>{t('Services.billingInterval')}</Label>
							<Text fontSize="small" color="neutral.800">
								{service?.billingInterval ? getServiceLabel(service.billingInterval) : '-'}
							</Text>
						</Stack>
						<Stack gap={4} style={{ gridColumn: 'span 2' }}>
							<Label>{t('General.description')}</Label>
							<Text fontSize="small" color="neutral.800">
								{emptyToDash(service?.description)}
							</Text>
						</Stack>
						{(acquisitionType === AcquisitionTypeEnum.BUY || (acquisitionType as string) === 'both') && (
							<Stack gap={4} style={{ gridColumn: 'span 2' }}>
								<Box style={{ gridColumn: 'span 2' }}>
									<Heading variant="h4">{t('General.buy')}</Heading>
								</Box>
								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(2, 1fr)',
										columnGap: tokens.spacing[6],
										rowGap: tokens.spacing[8]
									}}>
									<Stack gap={4}>
										<Label>{t('Services.inputOrderTime')}</Label>
										<Text fontSize="small" color="neutral.800">
											{service?.inputTypeForBuy ? getServiceLabel(service.inputTypeForBuy) : '-'}
										</Text>
									</Stack>
									<Stack gap={4}>
										<Label>{t('Services.isDefaultService')}</Label>
										<Text fontSize="small" color="neutral.800">
											{service?.isDefaultServiceForBuy !== undefined
												? service.isDefaultServiceForBuy
													? t('General.yes')
													: t('General.no')
												: '-'}
										</Text>
									</Stack>
									<Box style={{ gridColumn: 'span 2', width: '100%' }}>
										<Stack gap={4}>
											<Label>{t('General.price')}</Label>
											<DataTable
												columns={priceColumns}
												data={replaceNullInListWithDash(service?.buyPrices ?? [])}
												enableCheckboxes={false}
												enableRowClick={false}
												equalColumnWidths={true}
											/>
										</Stack>
									</Box>
								</div>
							</Stack>
						)}
						{(acquisitionType === AcquisitionTypeEnum.RENT || (acquisitionType as string) === 'both') && (
							<Stack gap={4} style={{ gridColumn: 'span 2' }}>
								<Box style={{ gridColumn: 'span 2' }}>
									<Heading variant="h4">{t('General.rent')}</Heading>
								</Box>
								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(2, 1fr)',
										columnGap: tokens.spacing[6],
										rowGap: tokens.spacing[8]
									}}>
									<Stack gap={4}>
										<Label>{t('Services.inputOrderTime')}</Label>
										<Text fontSize="small" color="neutral.800">
											{service?.inputTypeForRent ? getServiceLabel(service.inputTypeForRent) : '-'}
										</Text>
									</Stack>
									<Stack gap={4}>
										<Label>{t('Services.isDefaultService')}</Label>
										<Text fontSize="small" color="neutral.800">
											{service?.isDefaultServiceForRent !== undefined
												? service.isDefaultServiceForRent
													? t('General.yes')
													: t('General.no')
												: '-'}
										</Text>
									</Stack>
									<Box style={{ gridColumn: 'span 2', width: '100%' }}>
										<Stack gap={4}>
											<Label>{t('General.price')}</Label>
											<DataTable
												columns={priceColumns}
												data={replaceNullInListWithDash(service?.rentPrices ?? [])}
												enableCheckboxes={false}
												enableRowClick={false}
												equalColumnWidths={true}
											/>
										</Stack>
									</Box>
								</div>
							</Stack>
						)}
					</div>
				</Stack>
			</Box>
		</Box>
	)
}
