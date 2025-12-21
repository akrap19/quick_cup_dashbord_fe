'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import qs from 'query-string'
import { useDebounce } from 'rooks'

import { SearchInput } from '@/components/custom/inputs/search-input'
import { DataTableActions } from '@/components/data-display/data-table/DataTableActions'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { ConfirmActionDialog } from '@/components/overlay/confirm-action-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useOpened } from '@/hooks/use-toggle'
import { useTableStore } from '@/store/table'
import { Order } from 'api/models/order/order'
import { deleteOrder, deleteOrders } from 'api/services/orders'
import { ROUTES } from 'parameters'
import { OrderActionButtons } from './orderActionButtons'
import { UserRoleEnum } from 'enums/userRoleEnum'
import { OrderStatusEnum } from 'enums/orderStatusEnum'
import { useHasRoleAccess } from '@/hooks/use-has-role-access'

interface Props {
	data: Order[]
}

export const Inputs = ({ data }: Props) => {
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
	const hasRoleAccessForOrderActionButtons = useHasRoleAccess([
		UserRoleEnum.MASTER_ADMIN,
		UserRoleEnum.ADMIN,
		UserRoleEnum.CLIENT
	])
	const hasRoleAccessChangeStatus = useHasRoleAccess([UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN])
	const isClient = useHasRoleAccess([UserRoleEnum.CLIENT])
	const isAdminOrMasterAdmin = useHasRoleAccess([UserRoleEnum.MASTER_ADMIN, UserRoleEnum.ADMIN])

	const handleEdit = () => {
		const index = Object.keys(checkedItems || {})
		const numericIndex = parseInt(index[0], 10)

		const orderId = data[numericIndex]?.id

		if (!orderId) {
			return
		}

		push(ROUTES.EDIT_ORDERS + orderId)
		refresh()
	}

	const handleDelete = async () => {
		const indexes = Object.keys(checkedItems || {})

		const ids = indexes
			.map(index => {
				const numericIndex = parseInt(index, 10)
				return data[numericIndex]?.id
			})
			.filter((id): id is string => Boolean(id))

		if (ids.length === 0) {
			return
		}

		const isDeleteBulk = ids.length > 1
		const result = await (isDeleteBulk ? deleteOrders(ids) : deleteOrder(ids[0]))

		if (result?.message === 'OK') {
			SuccessToast(t(isDeleteBulk ? 'Orders.successfulBulkDelete' : 'Orders.successfullyDeleted'))
			clearCheckedItems()
			confirmDialog.toggleOpened()
			refresh()
		}
	}

	const getSelectedOrder = () => {
		const index = Object.keys(checkedItems || {})
		const numericIndex = parseInt(index[0], 10)

		return hasRoleAccessChangeStatus ? data[numericIndex] : undefined
	}

	const shouldShowEdit = () => {
		if (checkedItemsLength !== 1) {
			return false
		}

		const index = Object.keys(checkedItems || {})
		const numericIndex = parseInt(index[0], 10)
		const selectedOrder = data[numericIndex]

		if (!selectedOrder) {
			return false
		}

		if (isClient) {
			return selectedOrder.status === OrderStatusEnum.PENDING
		}

		return isAdminOrMasterAdmin
	}

	return (
		<div>
			{checkedItemsLength === 0 ? (
				<Inline justifyContent="space-between" alignItems="center">
					<Box style={{ width: '320px' }}>
						<SearchInput
							name="search"
							defaultValue={searchParams.get('search') || ''}
							placeholder={t('Orders.search')}
							onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
						/>
					</Box>
					{hasRoleAccessForOrderActionButtons && <OrderActionButtons />}
				</Inline>
			) : (
				<DataTableActions onEdit={shouldShowEdit() ? handleEdit : undefined} selectedItem={getSelectedOrder()} />
			)}
			<ConfirmActionDialog
				title="Orders.delete"
				description="Orders.deleteDescription"
				buttonLabel="General.delete"
				confirmDialog={confirmDialog}
				onSubmit={handleDelete}
			/>
		</div>
	)
}
