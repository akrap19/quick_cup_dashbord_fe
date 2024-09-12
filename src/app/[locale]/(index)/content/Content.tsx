import { format } from 'date-fns'
import { Dispatch, SetStateAction } from 'react'

import { Loader } from '@/components/custom/loader/Loader'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { DataTable } from '@/components/data-display/data-table'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'
import { Base } from 'api/models/common/base'
import { Language } from 'api/models/language/language'
import { ROUTES } from 'parameters'

import { ManageContentColumn, columns } from './columns'
import { contentSectionData } from './data'
import { Inputs } from './inputs'

// eslint-disable-next-line
interface Props<TData, TValue> {
	contentSection: string
	contentTableData: ManageContentColumn[]
	languages: Language[]
	languageValue: Base
	setLanguageValue: Dispatch<SetStateAction<Base>>
}

export const Content = <TData, TValue>({
	contentSection,
	contentTableData,
	languages,
	languageValue,
	setLanguageValue
}: Props<TData, TValue>) => {
	const contentDataKey = Object.keys(contentSectionData).find(key => key.includes(contentSection))
	const contentData = contentDataKey && contentSectionData[contentDataKey as keyof typeof contentSectionData]
	const currentLanguage = languages?.find(language => language.languageId === languageValue.id)
	const contentTableDataWithFormatedDate = contentTableData?.map(item => {
		return {
			...item,
			updated: format(item.updated, 'dd.MM.yyyy HH:mm')
		}
	})

	return (
		<Box paddingTop={5}>
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
						<DataTable columns={columns} data={contentTableDataWithFormatedDate} />
					) : currentLanguage?.autoTranslate ? (
						<NoListData
							navbarTitle="General.content"
							title="ManageContent.addAndReviewNewContentTitle"
							description="ManageContent.addAndReviewNewContentDescription"
							buttonLabel="ManageContent.addAndReviewNewContentButtonLabel"
							buttonLink={ROUTES.ADD_CONTENT}
							distanceFromTop="8vh"
							setNavbarItems={false}
						/>
					) : (
						<NoListData
							navbarTitle="General.content"
							title="ManageContent.contentNotAddedTitle"
							description="ManageContent.contentNotAddedDescription"
							buttonLabel="ManageContent.add"
							buttonLink={ROUTES.ADD_CONTENT}
							distanceFromTop="8vh"
							setNavbarItems={false}
						/>
					)
				) : (
					<Loader />
				)}
			</Stack>
		</Box>
	)
}
