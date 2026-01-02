'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import qs from 'query-string'
import { useDebounce } from 'rooks'

import { AddButton } from '@/components/custom/button/add-button'
import { SearchInput } from '@/components/custom/inputs/search-input'
import { DataTableActions } from '@/components/data-display/data-table/DataTableActions'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { ConfirmActionDialog } from '@/components/overlay/confirm-action-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useOpened } from '@/hooks/use-toggle'
import { useTableStore } from '@/store/table'
import { ServiceLocation } from 'api/models/service-locations/serviceLocation'
import { deleteServiceLocation } from 'api/services/serviceLocations'
import { ROUTES } from 'parameters'

interface Props {
	data: ServiceLocation[]
	serviceId: string
}

export const Inputs = ({ data, serviceId }: Props) => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const confirmDialog = useOpened()
	const { checkedItems, checkedItemsLength, clearCheckedItems } = useTableStore()
	const { push, replace, refresh } = useRouter()

	const handleFilterChange = (filter: string, value: string) => {
		const current = qs.parse(searchParams.toString())
		const query = { ...current, [filter]: value }
		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query
			},
			{ skipEmptyString: true }
		)

		replace(url)
	}

	const debouncedFilterChange = useDebounce(handleFilterChange, 300)

	const handleEdit = () => {
		const index = Object.keys(checkedItems || {})
		const numericIndex = parseInt(index[0], 10)

		push(ROUTES.EDIT_SERVICE_LOCATION.replace('{id}', serviceId) + data[numericIndex]?.id)
		refresh()
	}

	const handleDelete = async () => {
		const indexes = Object.keys(checkedItems || {})

		const ids = indexes.map(index => {
			const numericIndex = parseInt(index, 10)
			return data[numericIndex]?.id
		})

		if (ids.length === 0 || !ids[0]) return

		const result = await deleteServiceLocation(ids[0])

		if (result?.message === 'OK') {
			SuccessToast(t('ServiceLocations.successfullyDeleted'))
			clearCheckedItems()
			confirmDialog.toggleOpened()
			refresh()
		}
	}

	return (
		<div>
			{checkedItemsLength === 0 ? (
				<Inline justifyContent="space-between" alignItems="center">
					<Box style={{ width: '320px' }}>
						<SearchInput
							name="search"
							defaultValue={searchParams.get('search') || ''}
							placeholder={t('ServiceLocations.searchServiceLocation')}
							onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
						/>
					</Box>
					<AddButton
						buttonLabel={t('ServiceLocations.add')}
						buttonLink={ROUTES.ADD_SERVICE_LOCATION.replace('{id}', serviceId)}
					/>
				</Inline>
			) : (
				<DataTableActions onEdit={handleEdit} onDelete={() => confirmDialog.toggleOpened()} />
			)}
			<ConfirmActionDialog
				title="ServiceLocations.delete"
				description="ServiceLocations.deleteServiceLocationDescription"
				buttonLabel="General.delete"
				confirmDialog={confirmDialog}
				onSubmit={handleDelete}
			/>
		</div>
	)
}
