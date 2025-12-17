import { getService } from 'api/services/services'
import { getServiceLocations } from 'api/services/serviceLocations'

import { ServiceTabs } from './ServiceTabs'
import { Box } from '@/components/layout/box'

interface Props {
	params: {
		id: string
	}
	searchParams: {
		search?: string
		page?: number
		limit?: number
	}
}

const ServiceDetailsPage = async ({ params, searchParams }: Props) => {
	const { data: serviceData } = await getService(params.id)
	const { data: serviceLocationsData } = await getServiceLocations({
		search: searchParams.search || '',
		serviceId: params.id,
		page: searchParams.page || 1,
		limit: searchParams.limit || 10
	})
	const isInitialListEmpty =
		(serviceLocationsData?.pagination?.count === 0 && !searchParams.search) || serviceLocationsData === null

	return (
		<Box paddingTop={8} paddingX={10} width="100%">
			<ServiceTabs
				service={serviceData}
				serviceLocations={serviceLocationsData?.serviceLocations || []}
				serviceLocationsPagination={serviceLocationsData?.pagination}
				isInitialListEmpty={isInitialListEmpty}
			/>
		</Box>
	)
}

export default ServiceDetailsPage
