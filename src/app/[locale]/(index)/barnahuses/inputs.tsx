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
import { ROUTES } from 'parameters/routes'

export const Inputs = () => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const { checkedItemsLength } = useTableStore()
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
					<AddButton buttonLabel={t('Barnahuses.add')} buttonLink={ROUTES.ADD_BARNAHUS} />
				</Inline>
			) : (
				<DataTableActions onDelete={() => {}} />
			)}
		</div>
	)
}
