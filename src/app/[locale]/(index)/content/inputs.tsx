'use client'

import { useTranslations } from 'next-intl'

import { AddButton } from '@/components/custom/button/add-button'
import { SearchDropdown } from '@/components/custom/search-dropdown'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Base } from 'api/models/common/base'
import { Dispatch, SetStateAction, useEffect } from 'react'
import qs from 'query-string'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTableStore } from '@/store/table'
import { ConfirmActionDialog } from '@/components/overlay/confirm-action-dialog'
import { useOpened } from '@/hooks/use-toggle'
import { SuccessToast } from '@/components/overlay/toast-messages/SuccessToastmessage'
import { ManageContentColumn } from './columns'
import { ROUTES } from 'parameters'
import { DataTableActions } from '@/components/data-display/data-table/DataTableActions'
import { deleteAbout, deleteAbouts } from 'api/services/content/about'
import { deleteRoom, deleteRooms } from 'api/services/content/rooms'
import { deleteStaffs, deleteStaff } from 'api/services/content/staff'
import { Language } from 'api/models/language/language'

interface Props {
	data: ManageContentColumn[]
	languages: Language[]
	buttonLabel: string
	buttonLink: string
	languageValue: Base
	setLanguageValue: Dispatch<SetStateAction<Base>>
}

export const Inputs = ({ data, languages, buttonLabel, buttonLink, languageValue, setLanguageValue }: Props) => {
	const t = useTranslations()
	const { push, refresh } = useRouter()
	const searchParams = useSearchParams()
	const confirmDialog = useOpened()
	const { checkedItems, checkedItemsLength, clearCheckedItems } = useTableStore()
	const currentSearchParamas = qs.parse(searchParams.toString())
	const currentLanguage = languages?.find(language => language.languageId === languageValue.id)
	const dataWithTransformedId = data?.map(item => {
		return {
			...item,
			id: item.aboutId ?? item.roomId ?? item.staffId
		}
	})
	const transformedLanguageArray: Base[] = languages?.map((language: Language) => {
		return {
			id: language.languageId,
			name: language.name
		}
	})

	const handleValueChange = (value: string) => {
		const query = { ...currentSearchParamas, ['languageId']: value }
		const url = qs.stringifyUrl(
			{
				url: window.location.href,
				query
			},
			{ skipEmptyString: true }
		)

		push(url)
	}

	const handleEdit = () => {
		const index = Object.keys(checkedItems)
		const numericIndex = parseInt(index[0], 10)

		if (data[numericIndex].staffId) {
			push(ROUTES.EDIT_STAFF_CONTENT + data[numericIndex].staffId)
		} else if (data[numericIndex].aboutId) {
			push(ROUTES.EDIT_ABOUT_CONTENT + data[numericIndex].aboutId)
		} else if (data[numericIndex].roomId) {
			push(ROUTES.EDIT_ROOM_CONTENT + data[numericIndex].roomId)
		}
	}

	const handleDelete = async () => {
		let result
		const indexes = Object.keys(checkedItems)
		const ids = indexes.map(index => {
			const numericIndex = parseInt(index, 10)
			return dataWithTransformedId[numericIndex].id
		})

		const isDeleteBulk = ids.length > 1
		if (data[0].staffId) {
			result = await (isDeleteBulk ? deleteStaffs(ids) : deleteStaff(ids[0]))
		} else if (data[0].aboutId) {
			result = await (isDeleteBulk ? deleteAbouts(ids) : deleteAbout(ids[0]))
		} else if (data[0].roomId) {
			result = await (isDeleteBulk ? deleteRooms(ids) : deleteRoom(ids[0]))
		}

		if (result?.message === 'OK') {
			SuccessToast(t(isDeleteBulk ? 'ManageContent.successfullBulkDelete' : 'ManageContent.successfullyDeleted'))
			clearCheckedItems()
			confirmDialog.toggleOpened()
			refresh()
		}
	}

	useEffect(() => {
		handleValueChange(languageValue.id)
	}, [languageValue])

	return (
		<div>
			{checkedItemsLength === 0 ? (
				<Inline justifyContent="space-between" alignItems="center">
					<Box position="relative" style={{ width: '300px' }}>
						<SearchDropdown
							name="language"
							placeholder="General.language"
							value={languageValue.id}
							options={transformedLanguageArray}
							isFilter
							setValue={setLanguageValue}
							alwaysShowSearch
						/>
					</Box>
					{(data?.length > 0 || currentLanguage?.autoTranslate) && (
						<AddButton size="medium" variant="secondary" buttonLabel={t(buttonLabel)} buttonLink={buttonLink} />
					)}
				</Inline>
			) : (
				<DataTableActions size="medium" onEdit={handleEdit} onDelete={() => confirmDialog.toggleOpened()} />
			)}
			<ConfirmActionDialog
				title="ManageContent.delete"
				description="ManageContent.deleteContentDescription"
				buttonLabel="General.delete"
				confirmDialog={confirmDialog}
				onSubmit={handleDelete}
			/>
		</div>
	)
}
