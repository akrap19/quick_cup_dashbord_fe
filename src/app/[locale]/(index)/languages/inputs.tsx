'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import qs from 'query-string'
import { useDebounce } from 'rooks'

import { AddButton } from '@/components/custom/button/add-button'
import { DataTableActions } from '@/components/data-display/data-table/DataTableActions'
import { Select } from '@/components/inputs/select'
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

interface Props {
	data: Language[]
}

export const Inputs = ({ data }: Props) => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const confirmDialog = useOpened()
	const { checkedItems, checkedItemsLength, clearCheckedItems } = useTableStore()
	const { push, replace, refresh } = useRouter()
	const [disableDelete, setDisableDelete] = useState(false)
	const [displayDeleteInfo, setDisplayDeleteInfo] = useState(false)
	const [canLanguageBeDefault, setCanLanguageBeDefault] = useState(false)
	const indexes = Object.keys(checkedItems)
	const statusOptions = [
		{ value: '', label: 'General.allStatuses' },
		{ value: LanguageStatusEnum.DRAFT, label: 'General.draft' },
		{ value: LanguageStatusEnum.PUBLISHED, label: 'General.published' },
		{ value: LanguageStatusEnum.HIDDEN, label: 'General.hidden' }
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
		const index = Object.keys(checkedItems)
		const numericIndex = parseInt(index[0], 10)

		push(ROUTES.EDIT_LANGUAGES + data[numericIndex].languageId)
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
					<Box width="100%" style={{ maxWidth: '15.25rem' }}>
						<Select
							name="status"
							sizes="large"
							options={statusOptions}
							onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
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
