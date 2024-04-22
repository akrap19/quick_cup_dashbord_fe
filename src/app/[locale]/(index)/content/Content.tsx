import { DataTable } from '@/components/data-display/data-table'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

import { columns } from './columns'
import { contentSectionData, dummyData } from './data'
import { Inputs } from './inputs'

// eslint-disable-next-line
interface Props<TData, TValue> {
	contentSection: string
	contentTableData: TData[]
}

export const Content = <TData, TValue>({ contentSection, contentTableData }: Props<TData, TValue>) => {
	const contentDataKey = Object.keys(contentSectionData).find(key => key.includes(contentSection))
	const contentData = contentDataKey && contentSectionData[contentDataKey as keyof typeof contentSectionData]

	console.log('contentTableData', contentTableData)
	return (
		<Box paddingTop={5}>
			<Stack gap={4}>
				{contentData && (
					<Inputs languages={[]} buttonLabel={contentData?.buttonLabel} buttonLink={contentData?.buttonLink} />
				)}
				<DataTable columns={columns} data={dummyData} pagination={{} as any} />
			</Stack>
		</Box>
	)
}
