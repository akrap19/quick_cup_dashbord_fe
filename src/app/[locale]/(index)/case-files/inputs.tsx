'use client'

import { useSearchParams } from 'next/navigation'
import router from 'next/router'
import { useTranslations } from 'next-intl'
import qs from 'query-string'
import { useDebounce } from 'rooks'

import { AddButton } from '@/components/custom/button/add-button'
import { SearchInput } from '@/components/custom/inputs/search-input'
import { Select } from '@/components/inputs/select'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { ROUTES } from 'parameters'

export const Inputs = () => {
	const t = useTranslations()
	const searchParams = useSearchParams()

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
		<Inline justifyContent="space-between" alignItems="center">
			<Inline gap={4} alignItems="center">
				<Box style={{ width: '200px' }}>
					<Select
						name="dataTableSelect"
						sizes="large"
						options={[{ value: 'allStatuses', label: 'All Statuses' }]}
						onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
					/>
				</Box>
				<Box style={{ width: '320px' }}>
					<SearchInput
						name="searchKey"
						defaultValue={searchParams.get('searchKey') || ''}
						placeholder={t('CaseFiles.searchCase')}
						onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
					/>
				</Box>
			</Inline>
			<AddButton buttonLabel={t('CaseFiles.add')} buttonLink={ROUTES.ADD_CASE_FILES} />
		</Inline>
	)
}
