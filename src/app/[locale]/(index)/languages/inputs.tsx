'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import qs from 'query-string'
import { useDebounce } from 'rooks'

import { AddButton } from '@/components/custom/button/add-button'
import { DataTableActions } from '@/components/data-display/data-table/DataTableActions'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { ConfirmActionDialog } from '@/components/overlay/confirm-action-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useOpened } from '@/hooks/use-toggle'
import { useTableStore } from '@/store/table'
import { Language } from 'api/models/language/language'
import { deleteLanguage, deleteLanguages, makeLanguageDefault } from 'api/services/languages'
import { LanguageStatusEnum } from 'enums/languageStatusEnum'
import { ROUTES } from 'parameters/routes'
import { useEffect, useState } from 'react'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { Base } from 'api/models/common/base'

interface Props {
	data: Language[]
}

export const Inputs = ({ data }: Props) => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const status = searchParams.get('status')
	const confirmDialog = useOpened()
	const { checkedItems, checkedItemsLength, clearCheckedItems } = useTableStore()
	const { push, replace, refresh } = useRouter()
	const [disableDelete, setDisableDelete] = useState(false)
	const [displayDeleteInfo, setDisplayDeleteInfo] = useState(false)
	const [canLanguageBeDefault, setCanLanguageBeDefault] = useState(false)
	const indexes = Object.keys(checkedItems || {})
	const statusOptions = [
		{ id: '', name: t('General.allStatuses') },
		{ id: LanguageStatusEnum.DRAFT, name: t('General.draft') },
		{ id: LanguageStatusEnum.PUBLISHED, name: t('General.published') },
		{ id: LanguageStatusEnum.HIDDEN, name: t('General.hidden') }
	]

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

		push(ROUTES.EDIT_LANGUAGES + data[numericIndex].languageId)
		refresh()
	}

	const handleDelete = async () => {
		const ids = indexes
			.filter(index => {
				const numericIndex = parseInt(index, 10)
				return !(data[numericIndex]?.isDefault || data[numericIndex]?.hasCases)
			})
			.map(index => {
				const numericIndex = parseInt(index, 10)
				return data[numericIndex].languageId ?? ''
			})

		const isDeleteBulk = ids.length > 1
		const result = await (isDeleteBulk ? deleteLanguages(ids) : deleteLanguage(ids[0]))

		if (result?.message === 'OK') {
			SuccessToast(t(isDeleteBulk ? 'Languages.successfullBulkDelete' : 'Languages.successfullyDeleted'))
			clearCheckedItems()
			confirmDialog.toggleOpened()
			refresh()
		}
	}

	const handleMakeItDefault = async () => {
		const result = await makeLanguageDefault(data[parseInt(indexes[0], 10)].languageId)

		if (result?.message === 'OK') {
			SuccessToast(t('Languages.defaultLanguageSuccessfullyChanged'))

			refresh()
		}
	}

	const areActionsPossible = () => {
		const ids = indexes.map(index => {
			const numericIndex = parseInt(index, 10)
			return data[numericIndex]?.isDefault || data[numericIndex]?.hasCases
		})

		const allTrue = ids.every(Boolean)

		const anyTrue = ids.some(Boolean)

		if (indexes.length > 0) {
			const firstLanguage = data[parseInt(indexes[0], 10)]
			setCanLanguageBeDefault(firstLanguage?.status === LanguageStatusEnum.PUBLISHED && !firstLanguage?.isDefault)
		}

		setDisableDelete(allTrue)
		setDisplayDeleteInfo(anyTrue)
	}

	useEffect(() => {
		areActionsPossible()
	}, [checkedItems])

	return (
		<div>
			{checkedItemsLength === 0 ? (
				<Inline justifyContent="space-between" alignItems="center">
					<Box position="relative" style={{ width: '300px' }}>
						<SearchDropdown
							name="status"
							placeholder="General.status"
							value={status}
							options={statusOptions}
							isFilter
							setValue={(value: Base) => debouncedFilterChange('status', value?.id)}
						/>
					</Box>
					<AddButton buttonLabel={t('Languages.add')} buttonLink={ROUTES.ADD_LANGUAGES} />
				</Inline>
			) : (
				<DataTableActions
					disableDelete={disableDelete}
					displayDeleteInfo={displayDeleteInfo}
					onEdit={handleEdit}
					onMakeItDefault={canLanguageBeDefault ? handleMakeItDefault : undefined}
					onDelete={() => confirmDialog.toggleOpened()}
				/>
			)}
			<ConfirmActionDialog
				title="Languages.delete"
				description="Languages.deleteLanguageDescription"
				buttonLabel="General.delete"
				confirmDialog={confirmDialog}
				onSubmit={handleDelete}
			/>
		</div>
	)
}
