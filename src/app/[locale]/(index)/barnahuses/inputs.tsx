'use client'

import { useSearchParams } from 'next/navigation'
import router from 'next/router'
import { useTranslations } from 'next-intl'
import qs from 'query-string'
import { useDebounce } from 'rooks'

import { AddButton } from '@/components/custom/button/add-button'
import { SearchInput } from '@/components/custom/inputs/search-input'
import { PencilIcon } from '@/components/icons/pencil-icon'
import { TrashIcon } from '@/components/icons/trash-icon'
import { Button } from '@/components/inputs/button'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { useTableStore } from '@/store/table'
import { ROUTES } from 'parameters'

export const Inputs = () => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const { checkedItemsLength, clearCheckedItems } = useTableStore()

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

		router.push(url)
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
				<Inline justifyContent="space-between">
					<Inline gap={2} alignItems="flex-end">
						<Text color="neutral.400" fontSize="small">
							{t('General.itemsSelectedMessage', { count: checkedItemsLength })}
						</Text>
						<Button variant="adaptive" size="auto" onClick={() => clearCheckedItems()}>
							<Text color="primary.500" fontSize="small">
								{t('General.clearSection')}
							</Text>
						</Button>
					</Inline>
					<Inline gap={4}>
						<Button variant="secondary">
							<PencilIcon size="medium" color="neutral.700" />
							{t('General.edit')}
						</Button>
						<Button variant="secondary">
							<TrashIcon size="medium" color="destructive.500" />
							<Text color="destructive.500" fontWeight="semibold">
								{t('General.delete')}
							</Text>
						</Button>
					</Inline>
				</Inline>
			)}
		</div>
	)
}
