'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import qs from 'query-string'
import { useDebounce } from 'rooks'

import { AddButton } from '@/components/custom/button/add-button'
import { SearchInput } from '@/components/custom/inputs/search-input'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { ROUTES } from 'parameters'
import { Button } from '@/components/inputs/button'
import { useRentStore } from '@/store/rent'

import { ListBulletsIcon } from '@/components/icons/list-bullets-icon'
import { AcquisitionTypeEnum } from 'enums/acquisitionTypeEnum'
import { useHasRoleAccess } from '@/hooks/use-has-role-access'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { useOpenedStore } from '@/store/opened'

export const Inputs = () => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const { replace, push } = useRouter()
	const selectedItems = useRentStore(state => state.selectedItems)
	const itemsCount = selectedItems.length
	const hasSelectedProducts = itemsCount > 0
	const modalOpened = useOpenedStore()
	const hasAdminAccess = useHasRoleAccess([UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN])
	const hasServiceAccess = useHasRoleAccess([UserRoleEnum.SERVICE])

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

	const handleCreateRentOrder = () => {
		push(ROUTES.ADD_ORDERS + '?acquisitionType=' + AcquisitionTypeEnum.RENT)
	}

	return (
		<Inline justifyContent="space-between" alignItems="center">
			<Box style={{ width: '320px' }}>
				<SearchInput
					name="search"
					defaultValue={searchParams.get('search') || ''}
					placeholder={t('Rent.search')}
					onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
				/>
			</Box>
			<Inline gap={4} alignItems="center">
				{hasAdminAccess && <AddButton buttonLabel={t('Rent.add')} buttonLink={ROUTES.ADD_RENT} />}
				{hasSelectedProducts && hasServiceAccess && (
					<Button variant="primary" size="large" onClick={modalOpened.toggleOpened}>
						{t('Product.updateProductStates')} ({itemsCount})
					</Button>
				)}
				{itemsCount > 0 && !hasServiceAccess && (
					<Button variant="success" size="large" onClick={handleCreateRentOrder}>
						<ListBulletsIcon />
						{t('Orders.finishRentOrder')}
					</Button>
				)}
			</Inline>
		</Inline>
	)
}
