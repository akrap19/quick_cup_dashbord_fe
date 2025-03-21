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
import { ROUTES } from 'parameters'
import { Case } from 'api/models/content/case'
import { deleteCaseFile, deleteCaseFiles, updateCaseFile } from 'api/services/caseFiles'

interface Props {
	data: Case[]
}

export const Inputs = ({ data }: Props) => {
	const t = useTranslations()
	const searchParams = useSearchParams()
	const confirmDialog = useOpened()
	const { checkedItems, checkedItemsLength, clearCheckedItems } = useTableStore()
	const { replace, refresh } = useRouter()
	const checkedItemsArray = Object.keys(checkedItems || {})
	const checkedCase = checkedItemsLength === 1 ? data[Number(checkedItemsArray[0])] : undefined

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

	const handleNotes = async () => {
		const result = await updateCaseFile({
			...checkedCase,
			caseId: checkedCase?.caseId,
			canAddNotes: !checkedCase?.canAddNotes
		})

		if (result?.message === 'OK') {
			refresh()
		}
	}

	const handleDelete = async () => {
		const indexes = Object.keys(checkedItems || {})
		const ids = indexes.map(index => {
			const numericIndex = parseInt(index, 10)
			return data[numericIndex].caseId
		})

		const isDeleteBulk = ids.length > 1
		const result = await (isDeleteBulk ? deleteCaseFiles(ids) : deleteCaseFile(ids[0]))

		if (result?.message === 'OK') {
			SuccessToast(t(isDeleteBulk ? 'CaseJourney.successfullBulkDelete' : 'CaseJourney.successfullyDeleted'))
			clearCheckedItems()
			confirmDialog.toggleOpened()
			refresh()
		}
	}

	return (
		<div>
			{checkedItemsLength === 0 ? (
				<Inline justifyContent="space-between" alignItems="center">
					<Box style={{ width: '320px' }}>
						<SearchInput
							name="search"
							defaultValue={searchParams.get('search') || ''}
							placeholder={t('CaseJourney.searchCaseJourney')}
							onChange={({ target: { name, value } }) => debouncedFilterChange(name, value)}
						/>
					</Box>
					<AddButton buttonLabel={t('CaseJourney.add')} buttonLink={ROUTES.ADD_CASE_JOURNEY} />
				</Inline>
			) : (
				<DataTableActions
					onDelete={() => confirmDialog.toggleOpened()}
					onNotes={handleNotes}
					isNoteEnebled={checkedCase?.canAddNotes}
				/>
			)}
			<ConfirmActionDialog
				title="CaseJourney.delete"
				description="CaseJourney.deleteCaseJourneyDescription"
				buttonLabel="General.delete"
				confirmDialog={confirmDialog}
				onSubmit={handleDelete}
			/>
		</div>
	)
}
