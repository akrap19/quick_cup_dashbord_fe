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

interface Props {
	service: Service
}

export const ServiceDetails = ({ service }: Props) => {
	const t = useTranslations()

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
								{service?.name ?? t('General.name') + t('General.notDefined')}
							</Text>
						</Stack>
						<Stack gap={4}>
							<Label>{t('Services.priceCalculationUnit')}</Label>
							<Text fontSize="small" color="neutral.800">
								{formatUnitLabel(service?.priceCalculationUnit) ??
									t('Services.priceCalculationUnit') + t('General.notDefined')}
							</Text>
						</Stack>
					</div>
					<Box style={{ width: '100%' }}>
						<DataTable
							columns={priceColumns}
							data={replaceNullInListWithDash(service?.prices ?? [])}
							enableCheckboxes={false}
							enableRowClick={false}
							equalColumnWidths={true}
						/>
					</Box>
				</Stack>
			</Box>
		</Box>
	)
}
