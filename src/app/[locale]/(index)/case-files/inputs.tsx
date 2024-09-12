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
import { ConfirmActionDialog } from '@/components/overlay/confirm-action-dialog'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { useOpened } from '@/hooks/use-toggle'
import { useTableStore } from '@/store/table'
import { CaseFile } from 'api/models/caseFiles/caseFile'
import { deleteCaseFile, deleteCaseFiles } from 'api/services/caseFiles'
import { ROUTES } from 'parameters'

interface Props {
	data: CaseFile[]
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

	const handleEdit = () => {
		const index = Object.keys(checkedItems)
		const numericIndex = parseInt(index[0], 10)

		push(ROUTES.EDIT_CASE_FILES + data[numericIndex].caseId)
	}

	const handleDelete = async () => {
		const indexes = Object.keys(checkedItems)
		const ids = indexes.map(index => {
			const numericIndex = parseInt(index, 10)
			return data[numericIndex].caseId
		})

		const isDeleteBulk = ids.length > 1
		const result = await (isDeleteBulk ? deleteCaseFiles(ids) : deleteCaseFile(ids[0]))

		if (result?.message === 'OK') {
			SuccessToast(t(isDeleteBulk ? 'CaseFiles.successfullBulkDelete' : 'CaseFiles.successfullyDeleted'))
			clearCheckedItems()
			confirmDialog.toggleOpened()
			refresh()
		}
	}

	return (
		<div>
			{checkedItemsLength === 0 ? (
				<Inline justifyContent="space-between" alignItems="center">
					{/* <Box style={{ width: '200px' }}>
					<Select
						name="dataTableSelect"
						sizes="large"
						options={[{ value: 'allStatuses', label: 'All Statuses' }]}
						onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
					/>
					<SearchDropdown
						name="status"
						placeholder="General.language"
						value={languageValue.id}
						options={transformedLanguageArray}
						isFilter
						setValue={setLanguageValue}
					/>
				</Box> */}
					<Box style={{ width: '320px' }}>
						<SearchInput
							name="search"
							defaultValue={searchParams.get('search') || ''}
							placeholder={t('CaseFiles.searchCase')}
							onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
						/>
					</Box>
					<AddButton buttonLabel={t('CaseFiles.add')} buttonLink={ROUTES.ADD_CASE_FILES} />
				</Inline>
			) : (
				<DataTableActions onEdit={handleEdit} onDelete={() => confirmDialog.toggleOpened()} />
			)}
			<ConfirmActionDialog
				title="CaseFiles.delete"
				description="CaseFiles.deleteCaseFileDescription"
				buttonLabel="General.delete"
				confirmDialog={confirmDialog}
				onSubmit={handleDelete}
			/>
		</div>
	)
}
