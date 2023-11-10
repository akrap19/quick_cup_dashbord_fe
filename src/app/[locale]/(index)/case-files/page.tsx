import { SearchInput } from '@/components/custom/search-input'
import { DataTable } from '@/components/data-display/data-table'
import { PlusIcon } from '@/components/icons/plus-icon'
import { Button } from '@/components/inputs/button'
import { Select } from '@/components/inputs/select'
import { Box } from '@/components/layout/box'
import { Inline } from '@/components/layout/inline'
import { Stack } from '@/components/layout/stack'

import { columns } from './columns'
import { dummyData } from './data'

const CaseFilesPage = () => {
	// TODO: Fetch data here and pass it to "DataTable".
	return (
		<Box padding={8} width="100%">
			<Stack gap={8}>
				{/* TODO: I would even abstract this Box to other component (inputs.tsx) */}
				<Box display="flex" justify="space-between">
					<Inline gap={4}>
						{/* TODO: Add other options to select here and fix caret icon position */}
						<Select options={[{ value: '', label: 'All Statuses' }]} />
						<SearchInput />
					</Inline>
					<Button>
						<PlusIcon /> Add Case
					</Button>
				</Box>
				<DataTable columns={columns} data={dummyData} />
			</Stack>
		</Box>
	)
}

export default CaseFilesPage
