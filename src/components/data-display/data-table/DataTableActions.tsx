'use client'

import { useTranslations } from 'next-intl'

import { PencilIcon } from '@/components/icons/pencil-icon'
import { TrashIcon } from '@/components/icons/trash-icon'
import { Button } from '@/components/inputs/button'
import { ButtonVariants } from '@/components/inputs/button/Button.css'
import { Inline } from '@/components/layout/inline'
import { Text } from '@/components/typography/text'
import { useTableStore } from '@/store/table'
import { InputInfo } from '@/components/inputs/input-info'
import { StarsIcon } from '@/components/icons/stars-icon'

type DataTableActionsProps = {
	disableDelete?: boolean
	displayDeleteInfo?: boolean
	onEdit: () => void
	onMakeItDefault?: () => void
	onDelete: () => void
}

type Props = DataTableActionsProps & ButtonVariants

export const DataTableActions = ({
	size = 'large',
	disableDelete,
	displayDeleteInfo,
	onEdit,
	onMakeItDefault,
	onDelete
}: Props) => {
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
			<Inline gap={4} alignItems="center">
				{checkedItemsLength === 1 && (
					<Button size={size} variant="secondary" onClick={() => onEdit()}>
						<PencilIcon size="medium" color="neutral.700" />
						{t('General.edit')}
					</Button>
				)}
				{checkedItemsLength === 1 && onMakeItDefault && (
					<Button size={size} variant="secondary" onClick={() => onMakeItDefault()}>
						<StarsIcon size="medium" color="warning.500" />
						<Text color="warning.500" fontWeight="semibold">
							{t('Languages.makeItDefault')}
						</Text>
					</Button>
				)}
				<Button disabled={disableDelete} size={size} variant="secondary" onClick={() => onDelete()}>
					<TrashIcon size="medium" color="destructive.500" />
					<Text color="destructive.500" fontWeight="semibold">
						{t('General.delete')}
					</Text>
				</Button>
				{displayDeleteInfo && <InputInfo infoText="Languages.deleteInfo" />}
			</Inline>
		</Inline>
	)
}
