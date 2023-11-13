'use client'
import { AddButton } from '@/components/custom/add-button'
import qs from 'query-string'
import { useDebounce } from 'rooks'
import { SearchInput } from '@/components/custom/search-input'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { ROUTES } from 'parameters'
import router from 'next/router'
import { Select } from '@/components/inputs/select'

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
						size="large"
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
			<AddButton buttonLabel={t('CaseFiles.add')} buttonLink={ROUTES.ADD_BARNAHUS} />
		</Inline>
	)
}
