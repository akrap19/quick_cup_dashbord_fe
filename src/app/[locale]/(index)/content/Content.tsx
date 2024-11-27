import { format } from 'date-fns'
import { Dispatch, SetStateAction } from 'react'

import { Loader } from '@/components/custom/loader/Loader'
import { DataTable } from '@/components/data-display/data-table'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Base } from 'api/models/common/base'
import { Language } from 'api/models/language/language'

import { ManageContentColumn, columns } from './columns'
import { contentSectionData } from './data'
import { Inputs } from './inputs'
import { ContentNoListData } from './ContentNoListData'

// eslint-disable-next-line
interface Props<TData, TValue> {
	contentSection: string
	contentTableData: ManageContentColumn[]
	languages: Language[]
	languageValue: Base
	doesLanguageHasContent: boolean
	setLanguageValue: Dispatch<SetStateAction<Base>>
}

export const Content = <TData, TValue>({
	contentSection,
	contentTableData,
	languages,
	languageValue,
	doesLanguageHasContent,
	setLanguageValue
}: Props<TData, TValue>) => {
	const contentDataKey = Object.keys(contentSectionData).find(key => key.includes(contentSection))
	const contentData = contentDataKey && contentSectionData[contentDataKey as keyof typeof contentSectionData]
	const contentTableDataWithFormatedDate = contentTableData?.map(item => {
		return {
			...item,
			updated: format(item.updated, 'dd.MM.yyyy HH:mm')
		}
	})

	return (
		<Box paddingTop={6}>
			<Stack gap={4}>
				{contentData && (
					<Inputs
						data={contentTableData}
						languages={languages}
						buttonLabel={contentData?.buttonLabel}
						buttonLink={contentData?.buttonLink}
						languageValue={languageValue}
						setLanguageValue={setLanguageValue}
					/>
				)}
				{contentTableData ? (
					contentTableData?.length > 0 ? (
						<DataTable columns={columns} data={contentTableDataWithFormatedDate} contentSection={contentSection} />
					) : (
						<ContentNoListData
							contentSection={contentSection}
							languages={languages}
							languageValue={languageValue}
							doesLanguageHasContent={doesLanguageHasContent}
						/>
					)
				) : (
					<Loader />
				)}
			</Stack>
		</Box>
	)
}
