'use client'

import { useTranslations } from 'next-intl'

import { PencilIcon } from '@/components/icons/pencil-icon'
import { TrashIcon } from '@/components/icons/trash-icon'
import { Button } from '@/components/inputs/button'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { useTableStore } from '@/store/table'

interface Props {
	onEdit: () => void
	onDelete: () => void
}

export const DataTableActions = ({ onEdit, onDelete }: Props) => {
	const t = useTranslations()
	const { checkedItemsLength, clearCheckedItems } = useTableStore()

	return (
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
				{checkedItemsLength === 1 && (
					<Button variant="secondary" onClick={() => onEdit()}>
						<PencilIcon size="medium" color="neutral.700" />
						{t('General.edit')}
					</Button>
				)}
				<Button variant="secondary" onClick={() => onDelete()}>
					<TrashIcon size="medium" color="destructive.500" />
					<Text color="destructive.500" fontWeight="semibold">
						{t('General.delete')}
					</Text>
				</Button>
			</Inline>
		</Inline>
	)
}
