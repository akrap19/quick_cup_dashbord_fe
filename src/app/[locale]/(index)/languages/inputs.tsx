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
import { useNavbarItems } from '@/hooks/use-navbar-items'
import { useTableStore } from '@/store/table'
import { Barnahus } from 'api/models/barnahuses/barnahus'
import { ROUTES } from 'parameters/routes'

interface Props {
	data: Barnahus[]
}

export const Inputs = ({ data }: Props) => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const { checkedItems, checkedItemsLength } = useTableStore()
	const { push } = useRouter()
	useNavbarItems({ title: 'General.barnahus', useUserDropdown: true })

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
		console.log('testes')
	}

	const handleDelete = async () => {
		const indexes = Object.keys(checkedItems)
		console.log(data)
		console.log(indexes)
		// const ids = indexes.map(index => {
		// 	const numericIndex = parseInt(index, 10)
		// 	return data[numericIndex].id
		// })

		// const isDeleteBulk = ids.length > 1
		// const result = await (isDeleteBulk ? deleteBarnahuses(ids) : deleteBarnahus(ids[0]))

		// if (result?.message === 'OK') {
		// 	SuccessToast(t(isDeleteBulk ? 'Languages.successfullBulkDelete' : 'Languages.successfullyDeleted'))
		// 	clearCheckedItems()
		// 	refresh()
		// }
	}

	return (
		<div>
			{checkedItemsLength === 0 ? (
				<Inline justifyContent="space-between" alignItems="center">
					<Box style={{ width: '320px' }}>
						<SearchInput
							name="searchKey"
							defaultValue={searchParams.get('searchKey') || ''}
							placeholder={t('Barnahuses.searchBarnahus')}
							onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
						/>
					</Box>
					<AddButton buttonLabel={t('Language.add')} buttonLink={ROUTES.ADD_BARNAHUS} />
				</Inline>
			) : (
				<DataTableActions onEdit={handleEdit} onDelete={handleDelete} />
			)}
		</div>
	)
}
