'use client'

import { Service } from 'api/models/services/service'
import { ROUTES } from 'parameters'

import { DataTable } from '@/components/data-display/data-table'
import { replaceNullInListWithDash } from '@/utils/replaceNullInListWithDash'
import { ServiceLocation } from 'api/models/service-locations/serviceLocation'

import { Inputs } from './inputs'
import { columns } from './columns'
import { NoListData } from '@/components/custom/no-list-data/NoListData'
import { Box } from '@/components/layout/box'
import { Stack } from '@/components/layout/stack'

interface Props {
	service: Service
	serviceLocations?: ServiceLocation[]
	serviceLocationsPagination?: any
	isInitialListEmpty: boolean
}

export const ServiceLocationsList = ({
	service,
	serviceLocations = [],
	serviceLocationsPagination,
	isInitialListEmpty
}: Props) => {
	const normalizedLocations =
		serviceLocations?.map((location: any) => ({
			...location,
			id: location.id ?? '-',
			city: location.city ?? '-',
			phone: location.phone ?? '-',
			email: location.email ?? '-'
		})) ?? []

	return isInitialListEmpty ? (
		<NoListData
			navbarTitle="General.services"
			title="ServiceLocations.noListDataTitle"
			description="ServiceLocations.noListDataDescription"
			buttonLabel="ServiceLocations.add"
			setNavbarItems={false}
			buttonLink={ROUTES.ADD_SERVICE_LOCATION.replace('{id}', service.id)}
		/>
	) : (
		<Box width="100%">
			<Box width="100%" paddingY={6}>
				<Stack gap={7}>
					<Inputs data={normalizedLocations} serviceId={service.id} />
					<DataTable
						columns={columns}
						data={replaceNullInListWithDash(normalizedLocations)}
						pagination={serviceLocationsPagination}
					/>
				</Stack>
			</Box>
		</Box>
	)
}
