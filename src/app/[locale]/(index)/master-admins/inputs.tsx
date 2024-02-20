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
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useTableStore } from '@/store/table'
import { Admins } from 'api/models/admin/admins'
import { deleteMasterAdmin, deleteMasterAdmins } from 'api/services/masterAdmins'
import { ROUTES } from 'parameters'

interface Props {
	data: Admins[]
}

export const Inputs = ({ data }: Props) => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const { checkedItems, checkedItemsLength, clearCheckedItems } = useTableStore()
	const { push, refresh } = useRouter()
	useNavbarItems({ title: 'General.masterAdmins', useUserDropdown: true })

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

		push(url)
	}

	const debouncedFilterChange = useDebounce(handleFilterChange, 300)

	const handleEdit = () => {
		const index = Object.keys(checkedItems)
		const numericIndex = parseInt(index[0], 10)

		push(ROUTES.EDIT_MASTER_ADMINS + data[numericIndex].id)
	}

	const handleDelete = async () => {
		const indexes = Object.keys(checkedItems)
		const ids = indexes.map(index => {
			const numericIndex = parseInt(index, 10)
			return data[numericIndex].id
		})

		const isDeleteBulk = ids.length > 1
		const result = await (isDeleteBulk ? deleteMasterAdmins(ids) : deleteMasterAdmin(ids[0]))

		if (result?.message === 'OK') {
			SuccessToast(t(isDeleteBulk ? 'MasterAdmins.successfullBulkDelete' : 'MasterAdmins.successfullyDeleted'))
			clearCheckedItems()
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
							placeholder={t('MasterAdmins.searchMasterAdmin')}
							onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
						/>
					</Box>
					<AddButton buttonLabel={t('MasterAdmins.add')} buttonLink={ROUTES.ADD_MASTER_ADMINS} />
				</Inline>
			) : (
				<DataTableActions onEdit={handleEdit} onDelete={handleDelete} />
			)}
		</div>
	)
}
